package controller

import (
	"github.com/go-redis/redis/v8"
	"github.com/timfuhrmann/spotify-rooms/backend/conn"
	"github.com/timfuhrmann/spotify-rooms/backend/entity"
)

const (
	EventOnWelcome 		= "ON_WELCOME"
	EventJoinRoom		= "JOIN_ROOM"
	EventLeaveRoom		= "LEAVE_ROOM"
	EventUpdateRooms 	= "UPDATE_ROOMS"
	EventUpdatePlaylist	= "UPDATE_PLAYLIST"
	EventAddTrack		= "ADD_TRACK"
)

func CRE(rdb *redis.Client, ws *conn.WebSocket, fn func(rdb *redis.Client, ws *conn.WebSocket, event *entity.Event)) func(event *entity.Event) {
	return func(event *entity.Event) {
		fn(rdb, ws, event)
	}
}

func CR(rdb *redis.Client, ws *conn.WebSocket, fn func(rdb *redis.Client, ws *conn.WebSocket)) func(event *entity.Event) {
	return func(event *entity.Event) {
		fn(rdb, ws)
	}
}

func CE(ws *conn.WebSocket, fn func(ws *conn.WebSocket, event *entity.Event)) func(event *entity.Event) {
	return func(event *entity.Event) {
		fn(ws, event)
	}
}

func C(ws *conn.WebSocket, fn func(ws *conn.WebSocket)) func(event *entity.Event) {
	return func(event *entity.Event) {
		fn(ws)
	}
}