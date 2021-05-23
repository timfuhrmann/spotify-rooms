package action

import (
	"context"
	"github.com/go-redis/redis/v8"
	"github.com/timfuhrmann/spotify-rooms/backend/entity"
	"time"
)

func GetAllRooms(rdb *redis.Client) (entity.Rooms, error)  {
	ctx, _ := context.WithTimeout(context.Background(), 10*time.Second)

	res, err := rdb.HGetAll(ctx, entity.RoomsKey).Result()
	if err != nil {
		return nil, err
	}

	var rooms = make(entity.Rooms)
	for key, room := range res {
		var r entity.Room
		if err = r.UnmarshalRoom([]byte(room)); err != nil {
			return nil, err
		}
		rooms[key] = r
	}

	return rooms, nil
}
