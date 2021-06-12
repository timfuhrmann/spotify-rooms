package action

import (
	"context"
	"github.com/timfuhrmann/spotify-rooms/backend/db"
	"github.com/timfuhrmann/spotify-rooms/backend/entity"
	"time"
)

func GetAllRooms() (entity.Rooms, error)  {
	ctx, _ := context.WithTimeout(context.Background(), 10*time.Second)

	res, err := db.RDB.HGetAll(ctx, entity.RoomsKey).Result()
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
