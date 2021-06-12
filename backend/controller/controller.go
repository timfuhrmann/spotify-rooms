package controller

import (
	"github.com/timfuhrmann/spotify-rooms/backend/conn"
	"github.com/timfuhrmann/spotify-rooms/backend/entity"
)

const (
	EventOnWelcome 		= "ON_WELCOME"
	EventJoinRoom		= "JOIN_ROOM"
	EventLeaveRoom		= "LEAVE_ROOM"
	EventUpdateRooms 	= "UPDATE_ROOMS"
	EventUpdatePlaylist	= "UPDATE_PLAYLIST"
	EventUpdateVotes	= "UPDATE_VOTES"
	EventUpdateViewers	= "UPDATE_VIEWERS"
	EventAddTrack		= "ADD_TRACK"
	EventVoteSkip		= "VOTE_SKIP"
)

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