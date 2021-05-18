package action

import (
	"context"
	"github.com/timfuhrmann/spotify-rooms/backend/model"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
	"time"
)

type Rooms map[string]model.Room

func GetAllRooms (db *mongo.Database) (Rooms, error) {
	ctx, _ := context.WithTimeout(context.Background(), 10*time.Second)
	roomsCollection := db.Collection("rooms")

	cursor, err := roomsCollection.Find(ctx, bson.M{})
	if err != nil {
		return nil, err
	}
	defer cursor.Close(ctx)

	var rooms = make(map[string]model.Room)
	for cursor.Next(ctx) {
		var room model.Room
		if err = cursor.Decode(&room); err != nil {
			return nil, err
		}
		rooms[room.Id] = room
	}

	return rooms, nil
}
