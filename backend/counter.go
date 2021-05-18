package main

import (
	"github.com/timfuhrmann/spotify-rooms/backend/conn"
)

type Counter struct {
	quit chan bool
	hub *conn.Hub
}

func newCounter(h *conn.Hub) *Counter {
	return &Counter{
		quit: make(chan bool),
		hub: h,
	}
}

/*
func (c *Counter) run() {
	Ticker := time.NewTicker(1 * time.Second)
	go c.watch()

	for {
		select {
		case <- c.quit:
			return
		case <- Ticker.C:
			for rid, element := range Rooms {
				if element.Active != nil && element.Live == true {
					ms := element.Active.Date.UnixNano() / int64(time.Millisecond)
					date := time.Now().UnixNano() / int64(time.Millisecond)

					if date >= ms {
						return
						log.Printf("Init change track in room: %s", rid)
							z := Rooms[rid]
						z.Live = false
						Rooms[rid] = z

						track, err := action.GetNextTrack(Db, rid)
						if err != nil {
							log.Printf("Error trying to get next track: %v", err)
							return
						} else if track == nil {
							return
						}

						roid, err := primitive.ObjectIDFromHex(rid)
						if err != nil {
							log.Printf("Error trying to get object id from room: %v", err)
						}

						if err = action.SetActiveTrack(Db, &roid, track); err != nil {
							log.Printf("Error trying to set next active track: %v", err)
							return
						}

						if err = action.DelTrackFromPlaylist(Db, track.Id); err != nil {
							log.Printf("Error trying to delete track from playlist: %v", err)
						}
					}
				}
			}
		}
	}
}*/