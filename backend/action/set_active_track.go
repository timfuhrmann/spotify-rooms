package action

import (
	"context"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
	"time"
)

func SetActiveTrack(db *mongo.Database, roid *primitive.ObjectID, t interface{}) error {
	ctx, _ := context.WithTimeout(context.Background(), 10*time.Second)
	roomsCollection := db.Collection("rooms")

	_, err := roomsCollection.UpdateOne(ctx, bson.M{"_id": roid}, bson.D{
		{"$set", bson.D{{"active", t}}},
	})
	if err != nil {
		return err
	}

	return nil
}