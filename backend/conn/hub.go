package conn

import (
	"github.com/timfuhrmann/spotify-rooms/backend/entity"
)

type Answer struct {
	Client 	*WebSocket
	Message *entity.Event
}

type Hub struct {
	Answer chan *Answer
	Register chan *WebSocket
	Unregister chan *WebSocket
	Rooms map[string]map[*WebSocket]bool
	Clients map[*WebSocket]bool
}

func NewHub() *Hub {
	return &Hub{
		Answer: make(chan *Answer),
		Register: make(chan *WebSocket),
		Unregister: make(chan *WebSocket),
		Rooms: make(map[string]map[*WebSocket]bool),
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
	if action, ok := client.Events[message.Type]; ok {
		action(message)
	} else {
		close(client.Out)
		delete(h.Clients, client)
	}
}

func (h *Hub) ClientJoinRoom(client *WebSocket, rid string) {
	connections := h.Rooms[rid]
	if connections == nil {
		connections = make(map[*WebSocket]bool)
		h.Rooms[rid] = connections
	}
	h.Rooms[rid][client] = true
	client.Rid = rid
}

func (h *Hub) ClientLeaveRoom(client *WebSocket) {
	if client.Rid != "" {
		connections := h.Rooms[client.Rid]
		if connections != nil {
			if _, ok := connections[client]; ok {
				delete(connections, client)
				if len(connections) == 0 {
					delete(h.Rooms, client.Rid)
				}
				client.Rid = ""
			}
		}
	}
}

func (h *Hub) RoomsBroadcast(message *entity.Event) {
	for client := range h.Clients {
		if action, ok := client.Events[message.Type]; ok {
			action(message)
		} else {
			close(client.Out)
			delete(h.Clients, client)
		}
	}
}

func (h *Hub) RoomBroadcast(message *entity.Event) {
	connections := h.Rooms[message.Rid]
	for client := range connections {
		if action, ok := client.Events[message.Type]; ok {
			action(message)
		} else {
			close(client.Out)
			delete(connections, client)
			if len(connections) == 0 {
				delete(h.Rooms, client.Rid)
			}
		}
	}
}
