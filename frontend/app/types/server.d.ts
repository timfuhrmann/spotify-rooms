export module Server {
    interface Room {
        id: string;
        name: string;
        activeTrack?: Spotify.Track;
    }
}
