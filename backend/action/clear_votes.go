package action

import (
	"context"
	"fmt"
	"github.com/go-redis/redis/v8"
	"github.com/timfuhrmann/spotify-rooms/backend/entity"
	"log"
	"time"
)

func ClearVotes(rdb *redis.Client, rid string) error {
	ctx, _ := context.WithTimeout(context.Background(), 10*time.Second)
	playlistKey := fmt.Sprintf(entity.RoomSkip, rid)

	if err := rdb.Del(ctx, playlistKey).Err(); err != nil {
		log.Printf("Error trying to clear votes: %v", err)
		return err
	}

	return nil
}
