package action

import (
	"context"
	"fmt"
	"github.com/timfuhrmann/spotify-rooms/backend/db"
	"github.com/timfuhrmann/spotify-rooms/backend/entity"
	"log"
	"time"
)

func ClearVotes(rid string) error {
	ctx, _ := context.WithTimeout(context.Background(), 10*time.Second)
	playlistKey := fmt.Sprintf(entity.RoomSkip, rid)

	if err := db.RDB.Del(ctx, playlistKey).Err(); err != nil {
		log.Printf("Error trying to clear votes: %v", err)
		return err
	}

	return nil
}
