package action

import (
	"context"
	"fmt"
	"github.com/timfuhrmann/spotify-rooms/backend/db"
	"github.com/timfuhrmann/spotify-rooms/backend/entity"
	"time"
)

func GetPlaylistByRoom(rid string) (entity.Playlist, error) {
	ctx, _ := context.WithTimeout(context.Background(), 10*time.Second)
	playlistKey := fmt.Sprintf(entity.RoomPlaylist, rid)

	res, err := db.RDB.HGetAll(ctx, playlistKey).Result()
	if err != nil {
		return nil, err
	}

	var playlist = make(entity.Playlist)
	for key, room := range res {
		var r entity.Track
		if err = r.UnmarshalTrack([]byte(room)); err != nil {
			return nil, err
		}
		playlist[key] = &r
	}

	return playlist, nil
}
