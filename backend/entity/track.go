package entity

import (
	"encoding/json"
	"time"
)

type Track struct {
	Uid 		string		`json:"uid"`
	Id 			string		`json:"id"`
	Name 		string		`json:"name"`
	Duration 	int64		`json:"duration_ms"`
	Album 		Album		`json:"album"`
	Artists 	[]string	`json:"artists"`
	Date 		time.Time	`json:"date"`
	Url 		string		`json:"url"`
	Uri 		string		`json:"uri"`
}

type Album struct {
	Name 	string		`json:"name"`
	Images 	[]string	`json:"images"`
}

type Playlist = map[string]*Track

func (e *Track) MarshalTrack() ([]byte, error) {
	return json.Marshal(e)
}

func (e *Track) UnmarshalTrack(data []byte) error {
	if err := json.Unmarshal(data, &e); err != nil {
		return err
	}
	return nil
}
