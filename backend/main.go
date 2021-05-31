package main

import (
	"github.com/go-redis/redis/v8"
	"github.com/gorilla/mux"
	"github.com/joho/godotenv"
	"github.com/timfuhrmann/spotify-rooms/backend/conn"
	"log"
	"net/http"
	"os"
)

var Rdb *redis.Client

func init() {
    if os.Getenv("APP_ENV") != "production" {
        err := godotenv.Load()
        if err != nil {
            log.Fatalf("Error trying to load .env: %v", err)
        }
    }

	Rdb = newRedisClient()
}

func main() {
	defer Rdb.Close()

	h := conn.NewHub(Rdb)
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
