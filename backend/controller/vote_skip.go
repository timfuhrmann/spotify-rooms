package controller

import (
	"github.com/timfuhrmann/spotify-rooms/backend/action"
	"github.com/timfuhrmann/spotify-rooms/backend/conn"
	"github.com/timfuhrmann/spotify-rooms/backend/entity"
	"log"
)

func VoteSkip(ws *conn.WebSocket) {
	if err := action.AddVote(ws.Rid, ws.Uuid); err != nil {
		log.Printf("Error trying to add error: %v", err)
		return
	}

	length := action.GetVotesLength(ws.Rid)

	ws.Hub.RoomBroadcast(&entity.Event{
		Type: EventUpdateVotes,
		Payload: length,
		Rid: ws.Rid,
	})
}