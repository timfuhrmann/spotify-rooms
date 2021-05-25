package action

import (
	"context"
	"github.com/go-redis/redis/v8"
	"github.com/timfuhrmann/spotify-rooms/backend/entity"
	"time"
)

func DelActiveTrackFromRoom(rdb *redis.Client, room *entity.Room) error {
	ctx, _ := context.WithTimeout(context.Background(), 10*time.Second)

	room.Active = nil
	room.Live = true

	r, err := room.MarshalRoom()
	if err != nil {
		return err
	}

	if err = rdb.HSet(ctx, entity.RoomsKey, room.Id, r).Err(); err != nil {
		return err
	}

	return nil
}