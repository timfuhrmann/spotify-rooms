package action
//
//import (
//	"github.com/timfuhrmann/spotify-rooms/backend/model"
//	"go.mongodb.org/mongo-driver/mongo"
//	"time"
//)
//
//func GetNextTrack (db *mongo.Database, rid string) (*model.Track, error) {
//	tracks, err := GetTracksByRoom(db, rid)
//	if err != nil {
//		return nil, err
//	}
//
//	if len(tracks) == 0 {
//		return nil, nil
//	}
//
//	var track *model.Track
//	for _, newTrack := range tracks {
//		if track == nil {
//			track = &newTrack
//		} else {
//			date := track.Date.UnixNano() / int64(time.Millisecond)
//			newDate := newTrack.Date.UnixNano() / int64(time.Millisecond)
//			if newDate > date {
//				track = &newTrack
//			}
//		}
//	}
//
//	return track, nil
//}