package main

import (
	"github.com/timfuhrmann/spotify-rooms/backend/action"
	"github.com/timfuhrmann/spotify-rooms/backend/cache"
	"github.com/timfuhrmann/spotify-rooms/backend/conn"
	"log"
	"net/http"
)

func initGlobalWebSocket(h *conn.Hub, w http.ResponseWriter, r *http.Request) {
	ws, err := conn.NewWebSocket(h, w, r, "")
	if err != nil {
		log.Printf("Error creating conn connection: %v", err)
		return
	}

	ws.On("ON_WELCOME", func(event *conn.Event) {
		ws.Out <- (&conn.Event{
			Type: "ON_WELCOME",
			Payload: cache.Rooms,
		}).Raw()
	})

	ws.On("UPDATE_ROOMS", func(event *conn.Event) {
		ws.Out <- (&conn.Event{
			Type: "UPDATE_ROOMS",
			Payload: event.Payload,
		}).Raw()
	})
}

func initWebSocket(h *conn.Hub, w http.ResponseWriter, r *http.Request, rid string) {
	ws, err := conn.NewWebSocket(h, w, r, rid)
	if err != nil {
		log.Printf("Error creating conn connection: %v", err)
		return
	}

	ws.On("ON_WELCOME", func(event *conn.Event) {
		tracks, err := action.GetTracksByRoom(Db, rid)
		if err != nil {
			log.Printf("Error trying to get playlist: %v", err)
			return
		}

		ws.Out <- (&conn.Event{
			Type: "ON_WELCOME",
			Payload: tracks,
			Rid: rid,
		}).Raw()
	})

	ws.On("ADD_TRACK", func(event *conn.Event) {
		_, err := action.AddTrackToPlaylist(Db, event.Payload)
		if err != nil {
			log.Printf("Error trying to add track to playlist: %v", err)
			return
		}

		tracks, err := action.GetTracksByRoom(Db, rid)
		if err != nil {
			log.Printf("Error trying to get playlist: %v", err)
			return
		}

		ws.Out <- (&conn.Event{
			Type: "UPDATE_PLAYLIST",
			Payload: tracks,
			Rid: rid,
		}).Raw()
	})

	ws.On("UPDATE_ROOMS", func(event *conn.Event) {
		ws.Out <- (&conn.Event{
			Type: "UPDATE_ROOMS",
			Payload: event.Payload,
			Rid: rid,
		}).Raw()
	})

	ws.On("UPDATE_PLAYLIST", func(event *conn.Event) {
		ws.Out <- (&conn.Event{
			Type: "UPDATE_PLAYLIST",
			Payload: event.Payload,
			Rid: rid,
		}).Raw()
	})
}
