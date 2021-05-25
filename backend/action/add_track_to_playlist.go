package action

import (
	"context"
	"fmt"
	"github.com/go-redis/redis/v8"
	"github.com/timfuhrmann/spotify-rooms/backend/entity"
	"time"
)

const (
	ToActive = "active"
	ToPlaylist 	= "playlist"
)

func AddTrackToPlaylist(rdb *redis.Client, p interface{}, rid string) (string, error)  {
	ctx, _ := context.WithTimeout(context.Background(), 10*time.Second)
	playlistKey := fmt.Sprintf(entity.RoomPlaylist, rid)

	room, err := GetRoomById(rdb, rid)
	if err != nil {
		return "", err
	}

	track, err := entity.PayloadToTrack(p)
	if err != nil {
		return "", err
	}

	track.Date = time.Now()

	if room.Active == nil {
		if err = SetActiveTrack(rdb, track, room); err != nil {
			return "", err
		}
		return ToActive, nil
	}

	t, err := track.MarshalTrack()
	if err != nil {
		return "", err
	}

	if err = rdb.HSet(ctx, playlistKey, track.Id, t).Err(); err != nil {
		return "", err
	}

	return ToPlaylist, err
}