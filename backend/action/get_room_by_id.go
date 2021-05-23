package action

import (
	"context"
	"github.com/go-redis/redis/v8"
	"github.com/timfuhrmann/spotify-rooms/backend/entity"
	"time"
)

func GetRoomById(rdb *redis.Client, rid string) (*entity.Room, error)  {
	ctx, _ := context.WithTimeout(context.Background(), 10*time.Second)

	res, err := rdb.HGet(ctx, entity.RoomsKey, rid).Result()
	if err != nil {
		return nil, err
	}

	var room entity.Room
	if err = room.UnmarshalRoom([]byte(res)); err != nil {
		return nil, err
	}

	return &room, nil
}
