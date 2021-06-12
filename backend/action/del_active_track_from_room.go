package action

import (
	"context"
	"github.com/timfuhrmann/spotify-rooms/backend/db"
	"github.com/timfuhrmann/spotify-rooms/backend/entity"
	"time"
)

func DelActiveTrackFromRoom(room *entity.Room) error {
	ctx, _ := context.WithTimeout(context.Background(), 10*time.Second)

	room.Active = nil
	room.Live = true

	r, err := room.MarshalRoom()
	if err != nil {
		return err
	}

	if err = db.RDB.HSet(ctx, entity.RoomsKey, room.Id, r).Err(); err != nil {
		return err
	}

	return nil
}