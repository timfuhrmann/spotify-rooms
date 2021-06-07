package main

import (
	"github.com/gorilla/mux"
	"github.com/joho/godotenv"
	"github.com/timfuhrmann/spotify-rooms/backend/conn"
	"github.com/timfuhrmann/spotify-rooms/backend/db"
	"log"
	"net/http"
	"os"
)

func init() {
    if os.Getenv("APP_ENV") != "production" {
        err := godotenv.Load()
        if err != nil {
            log.Fatalf("Error trying to load .env: %v", err)
        }
    }

	db.Init()
}

func main() {
	defer db.Rdb.Close()

	h := conn.NewHub()
	go h.RunRooms()

	r := mux.NewRouter()
	r.Path("/ws").Methods("GET").HandlerFunc(H(h, RoomsWebSocketHandler))
	http.Handle("/", r)

	port := os.Getenv("PORT")
	if port == "" {
		log.Fatalln("No port specified")
	}

	log.Printf("Server successfully started on port %v", port)
	log.Fatal(http.ListenAndServe(":" + port, nil))
}
