package main

import (
	"github.com/timfuhrmann/spotify-rooms/backend/conn"
	"github.com/timfuhrmann/spotify-rooms/backend/controller"
	"log"
	"net/http"
)

func H(h *conn.Hub, fn func(http.ResponseWriter, *http.Request, *conn.Hub)) func(http.ResponseWriter, *http.Request) {
	return func(w http.ResponseWriter, r *http.Request) {
		fn(w, r, h)
	}
}

func RoomsWebSocketHandler(w http.ResponseWriter, r *http.Request, h *conn.Hub) {
	ws, err := conn.NewWebSocket(h, w, r)
	if err != nil {
		log.Printf("Error creating websocket connection: %v", err)
		return
	}

	ws.On(controller.EventOnWelcome, controller.C(ws, controller.OnWelcome))
	ws.On(controller.EventVoteSkip, controller.C(ws, controller.VoteSkip))
	ws.On(controller.EventLeaveRoom, controller.C(ws, controller.LeaveRoom))
	ws.On(controller.EventJoinRoom, controller.CE(ws, controller.JoinRoom))
	ws.On(controller.EventAddTrack, controller.CE(ws, controller.AddTrack))
	ws.On(controller.EventUpdateRooms, controller.CE(ws, controller.UpdateRooms))
	ws.On(controller.EventUpdateVotes, controller.CE(ws, controller.UpdateVotes))
	ws.On(controller.EventUpdateViewers, controller.CE(ws, controller.UpdateViewers))
	ws.On(controller.EventUpdatePlaylist, controller.CE(ws, controller.UpdatePlaylist))
}