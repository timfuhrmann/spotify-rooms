package action

import (
	"context"
	"fmt"
	"github.com/timfuhrmann/spotify-rooms/backend/db"
	"github.com/timfuhrmann/spotify-rooms/backend/entity"
	"log"
	"time"
)

func DelVote(rid string, uuid string) (*int64, error) {
	ctx, _ := context.WithTimeout(context.Background(), 10*time.Second)
	playlistKey := fmt.Sprintf(entity.RoomSkip, rid)

	result, err := db.RDB.HDel(ctx, playlistKey, uuid).Result()
	if err != nil {
		log.Printf("Error trying set clear votes: %v", err)
		return nil, err
	}

	if result != 0 {
		length := db.RDB.HLen(ctx, playlistKey).Val()
		return &length, nil
	}

	return nil, nil
}
