package action

import (
	"context"
	"fmt"
	"github.com/timfuhrmann/spotify-rooms/backend/db"
	"github.com/timfuhrmann/spotify-rooms/backend/entity"
	"time"
)

func GetVotesLength(rid string) int64 {
	ctx, _ := context.WithTimeout(context.Background(), 10*time.Second)
	playlistKey := fmt.Sprintf(entity.RoomSkip, rid)

	return db.RDB.HLen(ctx, playlistKey).Val()
}
