package controller

import (
	"github.com/timfuhrmann/spotify-rooms/backend/conn"
	"github.com/timfuhrmann/spotify-rooms/backend/entity"
)

func UpdatePlaylist(ws *conn.WebSocket, event *entity.Event) {
	ws.Out <- (event).Raw()
}