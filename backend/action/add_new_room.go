package action

import (
	"context"
	"github.com/timfuhrmann/spotify-rooms/backend/db"
	"github.com/timfuhrmann/spotify-rooms/backend/entity"
	"strconv"
	"time"
)

func AddNewRoom(room entity.Room) error {
	ctx, _ := context.WithTimeout(context.Background(), 10*time.Second)

	size := db.RDB.HLen(ctx, entity.RoomsKey)
	id := strconv.FormatInt(size.Val() + 1, 10)
	room.Id = id

	r, err := room.MarshalRoom()
	if err != nil {
		return err
	}

	if err = db.RDB.HSet(ctx, entity.RoomsKey, id, r).Err(); err != nil {
		return err
	}

	return nil
}
