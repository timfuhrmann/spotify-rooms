package controller

import (
	"github.com/go-redis/redis/v8"
	"github.com/timfuhrmann/spotify-rooms/backend/action"
	"github.com/timfuhrmann/spotify-rooms/backend/conn"
	"github.com/timfuhrmann/spotify-rooms/backend/entity"
	"log"
)

func VoteSkip(rdb *redis.Client, ws *conn.WebSocket) {
	if err := action.AddVote(rdb, ws.Rid, ws.Uuid); err != nil {
		log.Printf("Error trying to add error: %v", err)
		return
	}

	length := action.GetVotesLength(rdb, ws.Rid)

	ws.Hub.RoomBroadcast(&entity.Event{
		Type: EventUpdateVotes,
		Payload: length,
		Rid: ws.Rid,
	})
}