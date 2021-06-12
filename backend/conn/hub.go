package conn

import (
	"github.com/timfuhrmann/spotify-rooms/backend/action"
	"github.com/timfuhrmann/spotify-rooms/backend/entity"
)

type Answer struct {
	Client 	*WebSocket
	Message *entity.Event
}

type HubRoom struct {
	Counter *Counter
	Conns map[*WebSocket]bool
	Hub *Hub
	Rid string
}

type Hub struct {
	Answer chan *Answer
	Register chan *WebSocket
	Unregister chan *WebSocket
	Rooms map[string]*HubRoom
	Clients map[*WebSocket]bool
}

func NewHub() *Hub {
	return &Hub{
		Answer: make(chan *Answer),
		Register: make(chan *WebSocket),
		Unregister: make(chan *WebSocket),
		Rooms: make(map[string]*HubRoom),
		Clients: make(map[*WebSocket]bool),
	}
}

func (h *Hub) RunRooms() {
	for {
		select {
		case client := <-h.Register:
			h.clientRegister(client)
		case client := <-h.Unregister:
			h.clientUnregister(client)
		case answer := <-h.Answer:
			h.clientAnswer(answer.Client, answer.Message)
		}
	}
}

func (h *Hub) clientRegister(client *WebSocket) {
	h.Clients[client] = true
}

func (h *Hub) clientUnregister(client *WebSocket) {
	if _, ok := h.Clients[client]; ok {
		if client.Rid != "" {
			h.ClientLeaveRoom(client)
		}
		delete(h.Clients, client)
		close(client.Out)
	}
}

func (h *Hub) clientAnswer(client *WebSocket, message *entity.Event) {
	if handler, ok := client.Events[message.Type]; ok {
		handler(message)
	} else {
		close(client.Out)
		delete(h.Clients, client)
	}
}

func (h *Hub) ClientJoinRoom(client *WebSocket, rid string) {
	if h.Rooms[rid] == nil {
		h.Rooms[rid] = &HubRoom {
			Conns: make(map[*WebSocket]bool),
			Hub: h,
			Rid: rid,
		}
	}
	h.Rooms[rid].Conns[client] = true
	client.Rid = rid

	if h.Rooms[rid].Counter == nil {
		h.Rooms[rid].Counter = &Counter {
			Quit: make(chan bool),
			Active: false,
		}
		go h.Rooms[rid].runCounter()
	}
}

func (h *Hub) ClientLeaveRoom(client *WebSocket) {
	if client.Rid != "" {
		if h.Rooms[client.Rid] != nil {
			connections := h.Rooms[client.Rid].Conns
			if connections != nil {
				if _, ok := connections[client]; ok {
					h.checkVote(client)
					delete(connections, client)
					if len(connections) == 0 {
						h.Rooms[client.Rid].Counter.Quit <- true
					}
				}
			}
		}
		client.Rid = ""
	}
}

func (h *Hub) checkVote(client *WebSocket) {
	length, _ := action.DelVote(client.Rid, client.Uuid)
	if length != nil {
		h.RoomBroadcast(&entity.Event{
			Type: "UPDATE_VOTES",
			Payload: length,
			Rid: client.Rid,
		})
	}
}

func (h *Hub) RoomsBroadcast(message *entity.Event) {
	for client := range h.Clients {
		if handler, ok := client.Events[message.Type]; ok {
			handler(message)
		} else {
			close(client.Out)
			delete(h.Clients, client)
		}
	}
}

func (h *Hub) RoomBroadcast(message *entity.Event) {
	r := h.Rooms[message.Rid]
	if r != nil {
		connections := r.Conns
		for client := range connections {
			if handler, ok := client.Events[message.Type]; ok {
				handler(message)
			} else {
				close(client.Out)
				delete(connections, client)
				if len(connections) == 0 {
					h.Rooms[message.Rid].Counter.Quit <- true
					delete(h.Rooms, client.Rid)
				}
			}
		}
	}
}
