package action

import (
	"context"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
	"time"
)

func DelActiveTrack(db *mongo.Database, roid *primitive.ObjectID) error {
	ctx, _ := context.WithTimeout(context.Background(), 10*time.Second)
	roomsCollection := db.Collection("rooms")

	_, err := roomsCollection.UpdateOne(ctx, bson.M{"_id": roid}, bson.D{
		{"$unset", bson.M{"active": ""}},
	})
	if err != nil {
		return err
	}

	return nil
}
