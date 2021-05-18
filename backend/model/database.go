package model

import "time"

type Room struct {
	Id string			`bson:"_id" json:"id"`
	Name string			`bson:"name" json:"name"`
	Active *Track		`bson:"active,omitempty" json:"active,omitempty"`
	Live bool			`bson:"live" json:"live"`
}

type Track struct {
	Id string				`json:"id"`
	Rid string				`json:"rid"`
	Name string				`json:"name"`
	Duration int64			`json:"duration_ms" bson:"duration_ms"`
	Album Album				`json:"album"`
	Artists []string		`json:"artists"`
	Date time.Time          `json:"date"`
}

type Album struct {
	Name string			`json:"name"`
	Images []string		`json:"images"`
}
