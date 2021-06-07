package controller

import (
	"github.com/go-redis/redis/v8"
	"github.com/timfuhrmann/spotify-rooms/backend/action"
	"github.com/timfuhrmann/spotify-rooms/backend/conn"
	"github.com/timfuhrmann/spotify-rooms/backend/entity"
	"log"
	"math"
)

func VoteSkip(rdb *redis.Client, ws *conn.WebSocket) {
	if err := action.AddVote(rdb, ws.Rid, ws.Uuid); err != nil {
		log.Printf("Error trying to add error: %v", err)
		return
	}

	length := action.GetVotesLength(rdb, ws.Rid)

	n := float64(len(ws.Hub.Rooms[ws.Rid].Conns)) / 2
	if float64(length) >= math.Round(n) {
		room, err := action.GetRoomById(rdb, ws.Rid)
		if err != nil {
			log.Printf("Error trying to retrieve room: %v", err)
			return
		}

		result, err := action.InitNextTrack(rdb, room, ws.Rid)
		if err != nil {
			log.Printf("Error trying to change active track, %v", err)
			return
		} else if result == 1 {
			if err = ws.Hub.UpdateRoom(ws.Rid); err != nil {
				log.Printf("Error trying to update rooms, %v", err)
			}
		}
	} else {
		ws.Hub.RoomBroadcast(&entity.Event{
			Type: EventUpdateVotes,
			Payload: length,
			Rid: ws.Rid,
		})
	}
}