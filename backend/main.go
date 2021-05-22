package main

import (
	"context"
	"github.com/gorilla/mux"
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

	c := newCounter(hub)
	go c.run(Db)

	r := mux.NewRouter()
	r.HandleFunc("/ws", func(w http.ResponseWriter, r *http.Request) {
		initGlobalWebSocket(ghub, w, r)
	})
	r.HandleFunc("/ws/{rid}", func(w http.ResponseWriter, r *http.Request) {
		vars := mux.Vars(r)
		rid := vars["rid"]
		initWebSocket(hub, w, r, rid)
	})
	http.Handle("/", r)

	log.Println("Server successfully started")
	log.Fatal(http.ListenAndServe(":8080", nil))
}