package conn

import (
	"encoding/json"
)

type EventHandler func(*Event)

/*
{
	"e": "Event Type",
	"p": "Some interface{}",
}
 */

type Event struct {
	Rid string			`json:"rid"`
	Type string 		`json:"e"`
	Payload interface{} `json:"p"`
}

func EventSerializer(raw []byte) (*Event, error) {
	event := new(Event)
	err := json.Unmarshal(raw, event)
	return event, err
}

func (e *Event) Raw() []byte {
	raw, _ := json.Marshal(e)
	return raw
}