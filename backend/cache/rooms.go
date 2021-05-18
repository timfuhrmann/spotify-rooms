package cache

import (
	"context"
	"github.com/timfuhrmann/spotify-rooms/backend/action"
	"github.com/timfuhrmann/spotify-rooms/backend/conn"
	"github.com/timfuhrmann/spotify-rooms/backend/model"
	"go.mongodb.org/mongo-driver/mongo"
	"log"
)

var Rooms map[string]model.Room

func InitRooms(db *mongo.Database, h *conn.Hub) {
	roomsCollection := db.Collection("rooms")

	rooms, err := action.GetAllRooms(db)
	if err != nil {
		log.Printf("Error fetching all rooms after update: %v", err)
		return
	}
	Rooms = rooms

	stream, err := roomsCollection.Watch(context.TODO(), mongo.Pipeline{})
	if err != nil {
		log.Printf("Error reading database stream: %v", err)
	}
	defer stream.Close(context.TODO())

	for stream.Next(context.TODO()) {
		rooms, err := action.GetAllRooms(db)
		if err != nil {
			log.Printf("Error fetching all rooms after update: %v", err)
			return
		}

		Rooms = rooms
		h.Broadcast <- &conn.Event{
			Type: "UPDATE_ROOMS",
			Payload: rooms,
		}
	}
}
