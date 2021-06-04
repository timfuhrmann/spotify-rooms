package action

import (
	"github.com/go-redis/redis/v8"
	"github.com/timfuhrmann/spotify-rooms/backend/entity"
	"log"
)

func InitNextTrack(rdb *redis.Client, room *entity.Room, rid string) (int, error) {
	if err := RoomToIdle(rdb, room); err != nil {
		return 0, err
	}

	track, err := GetNextTrack(rdb, rid)
	if err != nil {
		return 0, err
	} else if track == nil {
		if err = DelActiveTrackFromRoom(rdb, room); err != nil {
			log.Printf("Error trying to get delete active track: %v", err)
		}
		return 1, err
	}

	if err = SetActiveTrack(rdb, track, room); err != nil {
		return 0, err
	}

	if err = DelTrackFromPlaylist(rdb, rid, track.Id); err != nil {
		return 0, err
	}

	return 1, err
}
