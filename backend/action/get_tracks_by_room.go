package action

import (
	"context"
	"github.com/timfuhrmann/spotify-rooms/backend/model"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
	"time"
)

func GetTracksByRoom(db *mongo.Database, rid string) (map[string]model.Track, error)  {
	ctx, _ := context.WithTimeout(context.Background(), 10*time.Second)
	playlistCollection := db.Collection("playlist")

	cursor, err := playlistCollection.Find(ctx, bson.M{"rid": rid})
	if err != nil {
		return nil, err
	}
	defer cursor.Close(ctx)

	var tracks = make(map[string]model.Track)
	for cursor.Next(ctx) {
		var track model.Track
		if err = cursor.Decode(&track); err != nil {
			return nil, err
		}
		tracks[track.Id] = track
	}

	return tracks, nil
}
