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
	addr := os.Getenv("REDIS_ADDR")
	if addr == "" {
		log.Fatalln("No redis address specified")
	}

	client := redis.NewClient(&redis.Options{
		Addr: addr,
		Password: "",
		DB: 0,
	})

	ctx, _ := context.WithTimeout(context.Background(), 10*time.Second)
	_, err := client.Ping(ctx).Result()
	if err != nil {
		log.Fatalf("Error trying to ping redis: %v", err)
	}

	if err = action.InitRooms(client); err != nil {
		log.Fatalf("Error trying to populate database with rooms: %v", err)
	}

	return client
}