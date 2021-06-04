package entity

import "encoding/json"

const (
	RoomsKey     	= "rooms"
	RoomPlaylist 	= "room:%s:playlist"
	RoomSkip 		= "room:%s:skip"
)

type Room struct {
	Id 		string	`json:"id"`
	Name 	string	`json:"name"`
	Active 	*Track	`json:"active,omitempty"`
	Live 	bool	`json:"live"`
}

type Rooms = map[string]Room

func (e *Room) MarshalRoom() ([]byte, error) {
	return json.Marshal(e)
}

func (e *Room) UnmarshalRoom(data []byte) error {
	if err := json.Unmarshal(data, &e); err != nil {
		return err
	}
	return nil
}
