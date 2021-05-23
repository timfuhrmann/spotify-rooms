package action
//
//import (
//	"context"
//	"errors"
//	"github.com/timfuhrmann/spotify-rooms/backend/model"
//	"go.mongodb.org/mongo-driver/bson"
//	"go.mongodb.org/mongo-driver/bson/primitive"
//	"go.mongodb.org/mongo-driver/mongo"
//	"time"
//)
//
//
//
//func GetTrackById(db *mongo.Database, oid *primitive.ObjectID) (*model.Track, error) {
//	ctx, _ := context.WithTimeout(context.Background(), 10*time.Second)
//	playlistCollection := db.Collection("playlist")
//
//	result := playlistCollection.FindOne(ctx, bson.M{"_id": oid})
//	if result == nil {
//		return nil, errors.New("couldn't find a result for the given id")
//	}
//
//	json := model.Track{}
//	if err := result.Decode(&json); err != nil {
//		return nil, errors.New("couldn't decode result")
//	}
//
//	return &json, nil
//}
