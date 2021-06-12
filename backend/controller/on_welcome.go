package controller

import (
	"github.com/timfuhrmann/spotify-rooms/backend/action"
	"github.com/timfuhrmann/spotify-rooms/backend/conn"
	"github.com/timfuhrmann/spotify-rooms/backend/entity"
	"log"
)

func OnWelcome(ws *conn.WebSocket) {
	rooms, err := action.GetAllRooms()
	if err != nil {
		log.Printf("Error trying to retrieve rooms on welcome: %v", err)
	}

	ws.Out <- (&entity.Event{
		Type: "ON_WELCOME",
		Payload: rooms,
	}).Raw()
}