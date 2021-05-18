package main

import (
	"context"
	"github.com/joho/godotenv"
	"github.com/timfuhrmann/spotify-rooms/backend/cache"
	"github.com/timfuhrmann/spotify-rooms/backend/conn"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
	"go.mongodb.org/mongo-driver/mongo/readpref"
	"log"
	"net/http"
	"os"
	"time"
)

var Db *mongo.Database

func main() {
	err := godotenv.Load()
	if err != nil {
		log.Fatalf("Error trying to load .env: %v", err)
	}

	ctx, _ := context.WithTimeout(context.Background(), 10*time.Second)
	uri := os.Getenv("MONGO_DB_CLUSTER_URI")
	clientOpts := options.Client().ApplyURI(uri)

	client, err := mongo.Connect(ctx, clientOpts)
	if err != nil {
		log.Fatalf("Error trying to create client: %v", err)
	}
	defer client.Disconnect(ctx)

	err = client.Ping(ctx, readpref.Primary())
	if err != nil {
		log.Fatalf("Error trying to ping database: %v", err)
	}

	Db = client.Database("prod")

	hub := conn.NewHub()
	go hub.Run()

	ghub := conn.NewHub()
	go ghub.RunGlobally()
	go cache.InitRooms(Db, ghub)

	http.HandleFunc("/gws", func(w http.ResponseWriter, r *http.Request) {
		initGlobalWebSocket(ghub, w, r)
	})

	http.HandleFunc("/ws", func(w http.ResponseWriter, r *http.Request) {
		rids, ok := r.URL.Query()["rid"]

		if !ok || len(rids) < 1 {
			log.Println("Url Param is missing")
			return
		}

		rid := rids[0]

		initWebSocket(hub, w, r, rid)
	})

	log.Println("Server successfully started")
	log.Fatal(http.ListenAndServe(":8080", nil))
}