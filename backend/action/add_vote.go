package action

import (
	"context"
	"fmt"
	"github.com/timfuhrmann/spotify-rooms/backend/db"
	"github.com/timfuhrmann/spotify-rooms/backend/entity"
	"time"
)

func AddVote(rid string, uuid string) error {
	ctx, _ := context.WithTimeout(context.Background(), 10*time.Second)
	playlistKey := fmt.Sprintf(entity.RoomSkip, rid)

	if err := db.RDB.HSet(ctx, playlistKey, uuid, true).Err(); err != nil {
		return err
	}

	return nil
}
