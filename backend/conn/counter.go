package conn

import (
	"github.com/timfuhrmann/spotify-rooms/backend/action"
	"github.com/timfuhrmann/spotify-rooms/backend/db"
	"github.com/timfuhrmann/spotify-rooms/backend/entity"
	"log"
	"time"
)

type Counter struct {
	Quit 	chan bool
	Active 	bool
}

func (h *HubRoom) runCounter() {
	Ticker := time.NewTicker(1 * time.Second)
	h.Counter.Active = true

	for {
		select {
		case <- h.Counter.Quit:
			h.Counter.Active = false
		case <- Ticker.C:
			room, err := action.GetRoomById(db.Rdb, h.Rid)
			if err != nil {
				log.Printf("Error trying to get room within counter: %v", err)
				break
			}

			if room.Active == nil && h.Counter.Active == false {
				h.Counter = nil
				delete(h.Hub.Rooms, h.Rid)
				return
			}

			if room.Active != nil && room.Live == true {
				ms := (room.Active.Date.UnixNano() / int64(time.Millisecond)) + room.Active.Duration
				date := time.Now().UnixNano() / int64(time.Millisecond)

				if date >= ms {
					result, err := action.InitNextTrack(db.Rdb, room, h.Rid)
					if err != nil {
						log.Printf("Error trying to change active track, %v", err)
						break
					} else if result == 1 {
						if err = h.Hub.UpdateRoom(h.Rid); err != nil {
							log.Printf("Error trying to update rooms, %v", err)
						}
					}
				}
			}
		}
	}
}

func (h *Hub) UpdateRoom(rid string) error {
	playlist, err := action.GetPlaylistByRoom(db.Rdb, rid)
	if err != nil {
		return err
	}
	h.RoomBroadcast(&entity.Event{
		Type: "UPDATE_PLAYLIST",
		Payload: playlist,
		Rid: rid,
	})

	rooms, err := action.GetAllRooms(db.Rdb)
	if err != nil {
		return err
	}
	h.RoomsBroadcast(&entity.Event{
		Type: "UPDATE_ROOMS",
		Payload: rooms,
	})


	if err = action.ClearVotes(db.Rdb, rid); err != nil {
		return err
	}
	h.RoomBroadcast(&entity.Event{
		Type: "UPDATE_VOTES",
		Payload: 0,
		Rid: rid,
	})

	return nil
}