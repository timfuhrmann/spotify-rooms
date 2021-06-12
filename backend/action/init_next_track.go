package action

import (
	"github.com/timfuhrmann/spotify-rooms/backend/entity"
	"log"
)

func InitNextTrack(room *entity.Room, rid string) (int, error) {
	if err := RoomToIdle(room); err != nil {
		return 0, err
	}

	track, err := GetNextTrack(rid)
	if err != nil {
		return 0, err
	} else if track == nil {
		if err = DelActiveTrackFromRoom(room); err != nil {
			log.Printf("Error trying to get delete active track: %v", err)
		}
		return 1, err
	}

	if err = SetActiveTrack(track, room); err != nil {
		return 0, err
	}

	if err = DelTrackFromPlaylist(rid, track.Uid); err != nil {
		return 0, err
	}

	return 1, err
}
