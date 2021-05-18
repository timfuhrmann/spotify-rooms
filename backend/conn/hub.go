package conn

type Hub struct {
	Broadcast chan *Event
	Register chan *WebSocket
	Unregister chan *WebSocket
	Rooms map[string]map[*WebSocket]bool
	Clients map[*WebSocket]bool
}

func NewHub() *Hub {
	return &Hub{
		Broadcast: make(chan *Event),
		Register: make(chan *WebSocket),
		Unregister: make(chan *WebSocket),
		Rooms: make(map[string]map[*WebSocket]bool),
		Clients: make(map[*WebSocket]bool),
	}
}

func (h *Hub) RunGlobally() {
	for {
		select {
		case client := <-h.Register:
			h.Clients[client] = true
		case client := <-h.Unregister:
			if _, ok := h.Clients[client]; ok {
				delete(h.Clients, client)
				close(client.Out)
			}
		case message := <-h.Broadcast:
			for client := range h.Clients {
				if action, ok := client.Events[message.Type]; ok {
					action(message)
				} else {
					close(client.Out)
					delete(h.Clients, client)
				}
			}
		}
	}
}

func (h *Hub) Run() {
	for {
		select {
		case client := <-h.Register:
			connections := h.Rooms[client.Rid]
			if connections == nil {
				connections = make(map[*WebSocket]bool)
				h.Rooms[client.Rid] = connections
			}
			h.Rooms[client.Rid][client] = true
		case client := <-h.Unregister:
			connections := h.Rooms[client.Rid]
			if connections != nil {
				if _, ok := connections[client]; ok {
					delete(connections, client)
					close(client.Out)
					if len(connections) == 0 {
						delete(h.Rooms, client.Rid)
					}
				}
			}
		case message := <-h.Broadcast:
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
	}
}

