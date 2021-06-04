package action

import (
	"context"
	"fmt"
	"github.com/go-redis/redis/v8"
	"github.com/timfuhrmann/spotify-rooms/backend/entity"
	"log"
	"time"
)

func DelVote(rdb *redis.Client, rid string, uuid string) (*int64, error) {
	ctx, _ := context.WithTimeout(context.Background(), 10*time.Second)
	playlistKey := fmt.Sprintf(entity.RoomSkip, rid)

	result, err := rdb.HDel(ctx, playlistKey, uuid).Result()
	if err != nil {
		log.Printf("Error trying set clear votes: %v", err)
		return nil, err
	}

	if result != 0 {
		length := rdb.HLen(ctx, playlistKey).Val()
		return &length, nil
	}

	return nil, nil
}
