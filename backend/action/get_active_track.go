package action

import (
	"context"
	"github.com/timfuhrmann/spotify-rooms/backend/model"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
	"log"
	"time"
)

func GetActiveTrack(db *mongo.Database, rid string) *primitive.ObjectID  {
	ctx, _ := context.WithTimeout(context.Background(), 10*time.Second)
	roomsCollection := db.Collection("rooms")

	roid, err := primitive.ObjectIDFromHex(rid)
	if err != nil {
		log.Printf("Error creating room oid: %v", err)
	}

	var room model.Room
	if err = roomsCollection.FindOne(ctx, bson.M{"_id": roid}).Decode(&room); err != nil {
		log.Printf("Couldn't find room: %v", err)
	}

	if room.Active != nil {
		return nil
	}

	return &roid
}
