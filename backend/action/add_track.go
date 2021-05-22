package action

import (
	"context"
	"errors"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
	"log"
	"time"
)

func AddTrackToPlaylist(db *mongo.Database, p interface{}) (*primitive.ObjectID, error)  {
	ctx, _ := context.WithTimeout(context.Background(), 10*time.Second)
	playlistCollection := db.Collection("playlist")

	m, ok := p.(map[string]interface{})
	if !ok {
		return nil, errors.New("couldn't create map from interface")
	}

	roid := GetActiveTrack(db, m["rid"].(string))

	if roid != nil {
		err := SetActiveTrack(db, roid, m)
		if err != nil {
			log.Printf("Error trying to set active track: %v", err)
		}
		return nil, nil
	}

	result, err := playlistCollection.InsertOne(ctx, m)
	if err != nil {
		return nil, err
	}

	oid, ok := result.InsertedID.(primitive.ObjectID)
	if !ok {
		return nil, errors.New("couldn't resolve result id")
	}

	return &oid, nil
}
