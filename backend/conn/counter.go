package conn

import (
	"github.com/timfuhrmann/spotify-rooms/backend/action"
	"github.com/timfuhrmann/spotify-rooms/backend/entity"
	"log"
	"math"
	"time"
)

type Counter struct {
	Quit 	chan bool
	Active 	bool
}

func (h *HubRoom) runCounter() {
	Ticker := time.NewTicker(1 * time.Second)
	h.Counter.Active = true
	viewers := 0

	for {
		select {
		case <- h.Counter.Quit:
			h.Counter.Active = false
		case <- Ticker.C:
			room, err := action.GetRoomById(h.Rid)
			if err != nil {
				log.Printf("Error trying to get room within counter: %v", err)
				break
			}

			// Check if room is still active and cancel goroutine if necessary
			if room.Active == nil && h.Counter.Active == false {
				h.Counter = nil
				delete(h.Hub.Rooms, h.Rid)
				return
			}

			// Check votes to skip track and init change if necessary
			if len(h.Conns) > 0 {
				n := float64(len(h.Conns)) / 2
				length := action.GetVotesLength(h.Rid)
				if float64(length) >= math.Round(n) {
					if err = h.nextTrack(room); err != nil {
						log.Printf("Error trying to change track after vote, %v", err)
					}
					break
				}
			}

			// Check viewers and update if necessary
			if len(h.Conns) != viewers {
				viewers = len(h.Conns)
				h.Hub.RoomBroadcast(&entity.Event{
					Type: "UPDATE_VIEWERS",
					Payload: len(h.Conns),
					Rid: h.Rid,
				})
			}

			// Check playing time of current track and init change if necessary
			if room.Active != nil && room.Live == true {
				ms := (room.Active.Date.UnixNano() / int64(time.Millisecond)) + room.Active.Duration
				date := time.Now().UnixNano() / int64(time.Millisecond)

				if date >= ms {
					if err = h.nextTrack(room); err != nil {
						log.Printf("Error trying to change track after track finished, %v", err)
						break
					}
				}
			}
		}
	}
}

func (h *HubRoom) nextTrack(room *entity.Room) error {
	result, err := action.InitNextTrack(room, h.Rid)
	if err != nil {
		return err
	} else if result == 1 {
		if err = h.Hub.updateRoom(h.Rid); err != nil {
			return err
		}
	}

	return nil
}

func (h *Hub) updateRoom(rid string) error {
	playlist, err := action.GetPlaylistByRoom(rid)
	if err != nil {
		return err
	}
	h.RoomBroadcast(&entity.Event{
		Type: "UPDATE_PLAYLIST",
		Payload: playlist,
		Rid: rid,
	})

	rooms, err := action.GetAllRooms()
	if err != nil {
		return err
	}
	h.RoomsBroadcast(&entity.Event{
		Type: "UPDATE_ROOMS",
		Payload: rooms,
	})


	if err = action.ClearVotes(rid); err != nil {
		return err
	}
	h.RoomBroadcast(&entity.Event{
		Type: "UPDATE_VOTES",
		Payload: 0,
		Rid: rid,
	})

	return nil
}
