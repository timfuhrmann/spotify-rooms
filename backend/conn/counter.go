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
						result, err := action.InitNextTrack(h.Counter.Rdb, &room, rid)
						if err != nil {
							log.Printf("Error trying to change active track, %v", err)
							break
						} else if result == 1 {
							if err = h.UpdateRoom(rid); err != nil {
								log.Printf("Error trying to update rooms, %v", err)
							}
						}
					}
				}
			}
		}
	}
}

func (h *Hub) UpdateRoom(rid string) error {
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


	if err = action.ClearVotes(h.Counter.Rdb, rid); err != nil {
		return err
	}
	h.RoomBroadcast(&entity.Event{
		Type: "UPDATE_VOTES",
		Payload: 0,
		Rid: rid,
	})

	return nil
}