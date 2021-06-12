package action

import (
	"context"
	"fmt"
	"github.com/timfuhrmann/spotify-rooms/backend/db"
	"github.com/timfuhrmann/spotify-rooms/backend/entity"
	"time"
)

func DelTrackFromPlaylist(rid string, trackUid string) error {
	ctx, _ := context.WithTimeout(context.Background(), 10*time.Second)
	playlistKey := fmt.Sprintf(entity.RoomPlaylist, rid)

	if err := db.RDB.HDel(ctx, playlistKey, trackUid).Err(); err != nil {
		return err
	}

	return nil
}