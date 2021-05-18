export namespace Server {
    interface Room {
        id: string;
        name: string;
        active?: ResTrack;
    }

    interface Track extends Spotify.Track {
        duration_ms: number;
    }

    interface ResTrack {
        id: string;
        name: string;
        duration_ms: number;
        artists: string[];
        album: ResAlbum;
        date?: string;
        rid?: string;
    }

    interface ResAlbum {
        name: string;
        images: string[];
    }
}
