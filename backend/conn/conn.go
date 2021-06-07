package conn

import (
	"github.com/google/uuid"
	"github.com/gorilla/websocket"
	"github.com/timfuhrmann/spotify-rooms/backend/entity"
	"log"
	"net/http"
	"time"
)

const (
	writeWait = 10 * time.Second
	pongWait = 60 * time.Second
	pingPeriod = (pongWait * 9) / 10
	maxMessageSize = 2048
)

var upgrader = websocket.Upgrader{
	ReadBufferSize: 2048,
	WriteBufferSize: 2048,
	CheckOrigin: func(r *http.Request) bool {
		return true
	},
}

type WebSocket struct {
	Uuid 	string
	Hub 	*Hub
	Conn 	*websocket.Conn
	Out 	chan []byte
	In 		chan []byte
	Rid 	string
	Events 	map[string]entity.EventHandler
}

func NewWebSocket(h *Hub, w http.ResponseWriter, r *http.Request) (*WebSocket, error) {
	conn, err := upgrader.Upgrade(w, r, nil)
	if err != nil {
		log.Printf("An error occured while upgrading the connection: %v", err)
		return nil, err
	}

	ws := &WebSocket{
		Uuid: uuid.New().String(),
		Hub: h,
		Conn: conn,
		Out: make(chan []byte),
		In: make(chan []byte),
		Events: make(map[string]entity.EventHandler),
	}
	ws.Hub.Register <- ws

	go ws.Reader()
	go ws.Writer()

	return ws, nil
}

func (ws *WebSocket) Reader() {
	defer func() {
		ws.Hub.Unregister <- ws
		ws.Conn.Close()
	}()

	ws.Conn.SetReadLimit(maxMessageSize)
	ws.Conn.SetReadDeadline(time.Now().Add(pongWait))
	ws.Conn.SetPongHandler(func(string) error { ws.Conn.SetReadDeadline(time.Now().Add(pongWait)); return nil })

	for {
		_, message, err := ws.Conn.ReadMessage()
		ws.Conn.SetWriteDeadline(time.Now().Add(writeWait))
		if err != nil {
			if websocket.IsUnexpectedCloseError(err, websocket.CloseGoingAway, websocket.CloseAbnormalClosure) {
				log.Printf("Message Error: %v", err)
			}
			break
		}

		event, err := entity.EventSerializer(message)
		if err != nil {
			log.Printf("Error parsing message: %v", err)
		}

		answer := Answer{
			Message: event,
			Client: ws,
		}

		ws.Hub.Answer <- &answer
	}
}

func (ws *WebSocket) Writer() {
	ticker := time.NewTicker(pingPeriod)
	defer func() {
		ticker.Stop()
	}()

	for {
		select {
			case message, ok := <- ws.Out:
				ws.Conn.SetWriteDeadline(time.Now().Add(writeWait))
				if !ok {
					ws.Conn.WriteMessage(websocket.CloseMessage, make([]byte, 0))
					return
				}
				w, err := ws.Conn.NextWriter(websocket.TextMessage)
				if err != nil {
					return
				}
				w.Write(message)
				w.Close()
		case <- ticker.C:
			ws.Conn.SetWriteDeadline(time.Now().Add(writeWait))
			if err := ws.Conn.WriteMessage(websocket.PingMessage, nil); err != nil {
				return
			}
		}
	}
}

func (ws *WebSocket) On(eventType string, action entity.EventHandler) *WebSocket {
	ws.Events[eventType] = action
	return ws
}