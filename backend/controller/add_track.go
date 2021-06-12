package controller

import (
	"github.com/timfuhrmann/spotify-rooms/backend/action"
	"github.com/timfuhrmann/spotify-rooms/backend/conn"
	"github.com/timfuhrmann/spotify-rooms/backend/entity"
	"log"
)

func AddTrack(ws *conn.WebSocket, event *entity.Event) {
	t, err := action.AddTrackToPlaylist(event.Payload, ws.Rid)
	if err != nil {
		log.Printf("Error trying to add track to playlist: %v", err)
		return
	}

	if action.ToActive == t {
		rooms, err := action.GetAllRooms()
		if err != nil {
			log.Printf("Error trying to retrieve rooms on new track: %v", err)
		}

		ws.Hub.RoomsBroadcast(&entity.Event{
			Type: EventUpdateRooms,
			Payload: rooms,
		})
	} else if action.ToPlaylist == t {
		tracks, err := action.GetPlaylistByRoom(ws.Rid)
		if err != nil {
			log.Printf("Error trying to retrieve playlist: %v", err)
			return
		}

		ws.Hub.RoomBroadcast(&entity.Event{
			Type: EventUpdatePlaylist,
			Payload: tracks,
			Rid: ws.Rid,
		})
	}
}