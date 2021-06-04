## Frontend
- Typescript
- React.js / Next.js
- Styled Components
- Next.js Api
- Spotify Web Api
- Spotify Wep Playback SDK

## Backend
- Golang
- Websocket
- Redis in-memory database


## Functionalities 
- Login using Spotify's refreshable user authorization
- Application separated in rooms
- A room contains a playlist and an active song
- User can add songs to playlist which will be played consecutively
- **Result:** everybody within a room is listening to the same song at the same time

## How (roughly explained)
1. Frontend: User authorizes using Spotify
2. Frontend: Spotify Web Playback SDK initialized 
2. Frontend: User joins room
3. Backend: Allocates user to respective room
4. Frontend: User adds song to playlist
5. Backend: Adds song to room's playlist or immediately to active track, if no song is currently playing
6. Backend: Backend waits for active track to be over (`if start_date + duration_ms >= current_date`), then initializes next track
