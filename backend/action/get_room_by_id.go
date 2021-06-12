package action

import (
	"context"
	"github.com/timfuhrmann/spotify-rooms/backend/db"
	"github.com/timfuhrmann/spotify-rooms/backend/entity"
	"time"
)

func GetRoomById(rid string) (*entity.Room, error)  {
	ctx, _ := context.WithTimeout(context.Background(), 10*time.Second)

	res, err := db.RDB.HGet(ctx, entity.RoomsKey, rid).Result()
	if err != nil {
		return nil, err
	}

	var room entity.Room
	if err = room.UnmarshalRoom([]byte(res)); err != nil {
		return nil, err
	}

	return &room, nil
}
