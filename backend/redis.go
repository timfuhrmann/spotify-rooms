package main

import (
	"context"
	"github.com/go-redis/redis/v8"
	"github.com/timfuhrmann/spotify-rooms/backend/action"
	"log"
	"os"
	"time"
)

func newRedisClient() *redis.Client {
	url := os.Getenv("REDIS_URL")
	if url == "" {
		log.Fatalln("No redis url specified")
	}

	opt, err := redis.ParseURL(url)
	client := redis.NewClient(opt)

	ctx, _ := context.WithTimeout(context.Background(), 10*time.Second)
	_, err = client.Ping(ctx).Result()
	if err != nil {
		log.Fatalf("Error trying to ping redis: %v", err)
	}

	if err = action.InitRooms(client); err != nil {
		log.Fatalf("Error trying to populate database with rooms: %v", err)
	}

	return client
}
