"Live Music for Spotify" is a full stack hobby project realizing an in rooms organized application for strangers or friends to meet and listen to music. 
It utilizes a Next.js frontend, Golang backend and Redis in-memory database to "broadcast" music to active rooms. 

Check it out: https://spotify-rooms.vercel.app/

## What?
- Login using Spotify's refreshable user authorization
- Application separated in rooms
- A room contains a playlist and an active song
- User can add songs to playlist which will be played consecutively
- **Result:** everybody within a room is listening to the same song at the same time

## Basic idea
1. Websocket connection 
2. User joins room and adds track to playlist
3. Backend updates room for everybody
4. Calculate correct play time from several timestamps
5. When track has finished, next track is being initialized and rooms updated
6. ...

## Frontend
- Typescript
- React.js / Next.js
- Styled Components
- Next.js Api
- Spotify Web Api
- Spotify Wep Playback SDK
- Vercel

## Backend
- Golang
- Websocket
- Redis in-memory database
- Heroku

![Preview](https://github.com/timfuhrmann/spotify-rooms/tree/develop/frontend/public/preview.png)

## To Do
- Since it's a hobby project for now, tests haven't been implemented yet

## Ideas
- User Accounts
- Chat
- Individual rooms

## Getting Started with Docker
To run the application locally you can either follow the instructions within the respective directories or use docker compose to initialize backend, frontend and redis at once:

1. Within each directory, copy `.env.public` to `.env` and fill in the missing details (Spotify Web API keys)
2. Within the root directory run `docker compose up`
3. Go to http://localhost:3000/
4. Done!
