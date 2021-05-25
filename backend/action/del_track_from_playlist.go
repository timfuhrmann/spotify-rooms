package action

import (
	"context"
	"fmt"
	"github.com/go-redis/redis/v8"
	"github.com/timfuhrmann/spotify-rooms/backend/entity"
	"time"
)

func DelTrackFromPlaylist(rdb *redis.Client, rid string, trackId string) error {
	ctx, _ := context.WithTimeout(context.Background(), 10*time.Second)
	playlistKey := fmt.Sprintf(entity.RoomPlaylist, rid)

	if err := rdb.HDel(ctx, playlistKey, trackId).Err(); err != nil {
		return err
	}

	return nil
}