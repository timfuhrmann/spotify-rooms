package conn

import (
	"github.com/go-redis/redis/v8"
	"github.com/timfuhrmann/spotify-rooms/backend/action"
	"github.com/timfuhrmann/spotify-rooms/backend/entity"
	"log"
	"time"
)

type Counter struct {
	Rdb 	*redis.Client
	Quit 	chan bool
	Active 	bool
}

func (h *Hub) runCounter() {
	Ticker := time.NewTicker(1 * time.Second)
	h.Counter.Active = true

	for {
		select {
		case <- h.Counter.Quit:
			h.Counter.Active = false
			return
		case <- Ticker.C:
			rooms, err := action.GetAllRooms(h.Counter.Rdb)
			if err != nil {
				log.Printf("Error triyng to get rooms wihtin counter: %v", err)
				break
			}

			for rid, room := range rooms {
				if room.Active != nil && room.Live == true {
					ms := (room.Active.Date.UnixNano() / int64(time.Millisecond)) + room.Active.Duration
					date := time.Now().UnixNano() / int64(time.Millisecond)

					if date >= ms {
						if err = action.RoomToIdle(h.Counter.Rdb, &room); err != nil {
							log.Printf("Error trying to set track to idle: %v", err)
							break
						}

						track, err := action.GetNextTrack(h.Counter.Rdb, rid)
						if err != nil {
							log.Printf("Error trying to get next track: %v", err)
							break
						} else if track == nil {
							if err = action.DelActiveTrackFromRoom(h.Counter.Rdb, &room); err != nil {
								log.Printf("Error trying to get delete active track: %v", err)
							}
							if err = h.updateRoom(rid); err != nil {
								log.Printf("Error trying update room: %v", err)
							}
							break
						}

						if err = action.SetActiveTrack(h.Counter.Rdb, track, &room); err != nil {
							log.Printf("Error trying to set next active track: %v", err)
							break
						}

						if err = action.DelTrackFromPlaylist(h.Counter.Rdb, rid, track.Id); err != nil {
							log.Printf("Error trying to del track from playlist: %v", err)
							break
						}

						if err = h.updateRoom(rid); err != nil {
							log.Printf("Error trying update room: %v", err)
							break
						}
					}
				}
			}
		}
	}
}

func (h *Hub) updateRoom(rid string) error {
	playlist, err := action.GetPlaylistByRoom(h.Counter.Rdb, rid)
	if err != nil {
		return err
	}
	h.RoomBroadcast(&entity.Event{
		Type: "UPDATE_PLAYLIST",
		Payload: playlist,
		Rid: rid,
	})

	rooms, err := action.GetAllRooms(h.Counter.Rdb)
	if err != nil {
		return err
	}
	h.RoomsBroadcast(&entity.Event{
		Type: "UPDATE_ROOMS",
		Payload: rooms,
	})

	return nil
}