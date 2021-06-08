export namespace Server {
    interface Room {
        id: string;
        name: string;
        active?: ResTrack;
    }

    interface Track extends Spotify.Track {
        duration_ms: number;
        external_urls: {
            spotify?: string;
        };
    }

    interface ResTrack {
        uid: string;
        id: string;
        name: string;
        duration_ms: number;
        artists: string[];
        album: ResAlbum;
        uri: string;
        date?: string;
        url?: string;
    }

    interface ResAlbum {
        name: string;
        images: string[];
    }
}
