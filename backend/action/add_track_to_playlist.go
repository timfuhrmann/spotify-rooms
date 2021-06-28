package action

import (
	"context"
	"fmt"
	"github.com/timfuhrmann/spotify-rooms/backend/db"
	"github.com/timfuhrmann/spotify-rooms/backend/entity"
	"strconv"
	"time"
)

const (
	ToActive 	= "active"
	ToPlaylist 	= "playlist"
)

func AddTrackToPlaylist(p interface{}, rid string) (string, error)  {
	ctx, _ := context.WithTimeout(context.Background(), 10*time.Second)
	playlistKey := fmt.Sprintf(entity.RoomPlaylist, rid)

	room, err := GetRoomById(rid)
	if err != nil {
		return "", err
	}

	track, err := entity.PayloadToTrack(p)
	if err != nil {
		return "", err
	}

	// Generate unique id from track's id and date to avoid disparities in case of repeating tracks
	track.Uid = track.Id + strconv.FormatInt(time.Now().UnixNano() / int64(time.Millisecond), 10)
	track.Date = time.Now().UTC()

	// If room has no active track, immediately go to active
	if room.Active == nil {
		if err = SetActiveTrack(track, room); err != nil {
			return "", err
		}
		return ToActive, nil
	}

	t, err := track.MarshalTrack()
	if err != nil {
		return "", err
	}

	if err = db.RDB.HSet(ctx, playlistKey, track.Uid, t).Err(); err != nil {
		return "", err
	}

	return ToPlaylist, err
}