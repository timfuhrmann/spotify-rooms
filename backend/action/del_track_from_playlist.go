package action
//
//import (
//	"context"
//	"go.mongodb.org/mongo-driver/bson"
//	"go.mongodb.org/mongo-driver/mongo"
//	"time"
//)
//
//func DelTrackFromPlaylist(db *mongo.Database, id string) error  {
//	ctx, _ := context.WithTimeout(context.Background(), 10*time.Second)
//	playlistCollection := db.Collection("playlist")
//
//	_, err := playlistCollection.DeleteOne(ctx, bson.M{"id": id})
//	if err != nil {
//		return err
//	}
//
//	return nil
//}
