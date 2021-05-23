package controller

import (
	"github.com/go-redis/redis/v8"
	"github.com/timfuhrmann/spotify-rooms/backend/action"
	"github.com/timfuhrmann/spotify-rooms/backend/conn"
	"github.com/timfuhrmann/spotify-rooms/backend/entity"
	"log"
)

func JoinRoom(rdb *redis.Client, ws *conn.WebSocket, event *entity.Event) {
	rid, err := entity.PayloadToRid(event.Payload)
	if err != nil {
		log.Printf("Error tring to retrieve rid: %v", err)
		return
	} else if rid == "" {
		log.Println("Room id not provided")
		return
	}

	ws.Hub.ClientJoinRoom(ws, rid)

	tracks, err := action.GetPlaylistByRoom(rdb, rid)
	if err != nil {
		log.Printf("Error trying to retrieve playlist: %v", err)
		return
	}

	ws.Out <- (&entity.Event{
		Type: "JOIN_ROOM",
		Payload: tracks,
	}).Raw()
}