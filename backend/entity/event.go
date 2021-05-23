package entity

import (
	"encoding/json"
	"errors"
)

type EventHandler func(*Event)

/*
{
	"e": "Event Type",
	"p": "Some interface{}",
	"rid": "Room id"
}
 */

type Event struct {
	Type    string  	`json:"e"`
	Payload interface{} `json:"p"`
	Rid     string  	`json:"rid"`
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

func PayloadToTrack(p interface{}) (*Track, error) {
	m, ok := p.(map[string]interface{})
	if !ok {
		return nil, errors.New("couldn't convert interface to map")
	}
	t := m["track"]
	if t == nil {
		return nil, errors.New("couldn't convert interface to map")
	}

	raw, err := json.Marshal(t)
	if err != nil {
		return nil, err
	}

	track := Track{}
	if err = json.Unmarshal(raw, &track); err != nil {
		return nil, err
	}

	return &track, nil
}

func PayloadToRid(p interface{}) (string, error) {
	m, ok := p.(map[string]interface{})
	if !ok {
		return "", errors.New("couldn't convert interface to map")
	}
	rid, ok := m["rid"].(string)
	if !ok {
		return "", errors.New("couldn't convert interface to string")
	}

	return rid, nil
}