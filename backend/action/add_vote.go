package action

import (
	"context"
	"fmt"
	"github.com/go-redis/redis/v8"
	"github.com/timfuhrmann/spotify-rooms/backend/entity"
	"time"
)

func AddVote(rdb *redis.Client, rid string, uuid string) error {
	ctx, _ := context.WithTimeout(context.Background(), 10*time.Second)
	playlistKey := fmt.Sprintf(entity.RoomSkip, rid)

	if err := rdb.HSet(ctx, playlistKey, uuid, true).Err(); err != nil {
		return err
	}

	return nil
}
