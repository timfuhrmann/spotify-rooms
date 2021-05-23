package main
//
//import (
//	"encoding/json"
//	"github.com/timfuhrmann/spotify-rooms/backend/action"
//	"github.com/timfuhrmann/spotify-rooms/backend/cache"
//	"github.com/timfuhrmann/spotify-rooms/backend/conn"
//	"go.mongodb.org/mongo-driver/bson/primitive"
//	"go.mongodb.org/mongo-driver/mongo"
//	"log"
//	"time"
//)
//
//type Counter struct {
//	quit chan bool
//	hub *conn.Hub
//}
//
//func newCounter(h *conn.Hub) *Counter {
//	return &Counter{
//		quit: make(chan bool),
//		hub: h,
//	}
//}
//
//
//func (c *Counter) run(db *mongo.Database) {
//	Ticker := time.NewTicker(1 * time.Second)
//	for {
//		select {
//		case <- c.quit:
//			return
//		case <- Ticker.C:
//			for rid, element := range cache.Rooms {
//				if element.Active != nil && element.Live == true {
//					ms := (element.Active.Date.UnixNano() / int64(time.Millisecond)) + element.Active.Duration
//					date := time.Now().UnixNano() / int64(time.Millisecond)
//
//					if date >= ms {
//						log.Printf("Init change track in room: %s", rid)
//						z := cache.Rooms[rid]
//						z.Live = false
//						cache.Rooms[rid] = z
//
//						roid, err := primitive.ObjectIDFromHex(rid)
//						if err != nil {
//							log.Printf("Error trying to get object id from room: %v", err)
//							break
//						}
//
//						track, err := action.GetNextTrack(db, rid)
//						if err != nil {
//							log.Printf("Error trying to get next track: %v", err)
//							break
//						} else if track == nil {
//							if err = action.DelActiveTrack(db, &roid); err != nil {
//								log.Printf("Error trying to delete active track: %v", err)
//							}
//							break
//						}
//
//						var m map[string]interface{}
//						j, _ := json.Marshal(track)
//						if err != nil {
//							log.Printf("Error trying to marshal track: %v", err)
//							break
//						}
//						if err = json.Unmarshal(j, &m); err != nil {
//							log.Printf("Error trying to unmarshal track: %v", err)
//							break
//						}
//
//						if err = action.SetActiveTrack(db, &roid, m); err != nil {
//							log.Printf("Error trying to set next active track: %v", err)
//							break
//						}
//
//						if err = action.DelTrackFromPlaylist(db, track.Id); err != nil {
//							log.Printf("Error trying to delete track from playlist: %v", err)
//							break
//						}
//
//						playlist, err := action.GetTracksByRoom(db, rid)
//						if err != nil {
//							log.Printf("Error trying to get playlist: %v", err)
//							return
//						}
//
//						c.hub.Broadcast <- &conn.Event{
//							Type: "UPDATE_PLAYLIST",
//							Payload: playlist,
//							Rid: rid,
//						}
//					}
//				}
//			}
//		}
//	}
//}