package controller

import (
	"github.com/timfuhrmann/spotify-rooms/backend/conn"
)

func LeaveRoom(ws *conn.WebSocket) {
	ws.Hub.ClientLeaveRoom(ws)
}