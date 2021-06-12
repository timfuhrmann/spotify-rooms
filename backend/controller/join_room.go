package controller

import (
	"context"
	"fmt"
	"github.com/timfuhrmann/spotify-rooms/backend/action"
	"github.com/timfuhrmann/spotify-rooms/backend/conn"
	"github.com/timfuhrmann/spotify-rooms/backend/db"
	"github.com/timfuhrmann/spotify-rooms/backend/entity"
	"log"
	"time"
)

func JoinRoom(ws *conn.WebSocket, event *entity.Event) {
	ctx, _ := context.WithTimeout(context.Background(), 10*time.Second)

	rid, err := entity.PayloadToRid(event.Payload)
	if err != nil {
		log.Printf("Error tring to retrieve rid: %v", err)
		return
	} else if rid == "" {
		log.Println("Room id not provided")
		return
	}

	ws.Hub.ClientJoinRoom(ws, rid)

	tracks, err := action.GetPlaylistByRoom(rid)
	if err != nil {
		log.Printf("Error trying to retrieve playlist: %v", err)
		return
	}

	ws.Out <- (&entity.Event{
		Type: "JOIN_ROOM",
		Payload: tracks,
		Rid: rid,
	}).Raw()

	playlistKey := fmt.Sprintf(entity.RoomSkip, rid)
	length := db.RDB.HLen(ctx, playlistKey).Val()

	if length > 0 {
		ws.Out <- (&entity.Event{
			Type: "UPDATE_VOTES",
			Payload: length,
			Rid: rid,
		}).Raw()
	}

	r := ws.Hub.Rooms[rid]
	if r != nil && r.Conns != nil {
		ws.Out <- (&entity.Event{
			Type: "UPDATE_VIEWERS",
			Payload: len(r.Conns),
			Rid: rid,
		}).Raw()
	}
}