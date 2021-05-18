import {Server} from "./server";

export module Api {
    interface RTCRoom {
        id: string;
        name: string;
        activeTrack?: RoomTrack;
        position: 0;
    }

    interface SpotifySearchResponse {
        tracks: {
            items: Server.Track[];
        };
    }

    interface SpotifyImage {
        height: number;
        width: number;
        url: string;
    }

    interface SpotifyAlbum {
        images: SpotifyImage[];
    }

    interface SpotifyArtist {
        id: string;
        name: string;
        uri: string;
    }

    interface SpotifyTrack {
        album: SpotifyAlbum;
        artists: SpotifyArtist[];
        id: string;
        uri: string;
        name: string;
        duration_ms: number;
        external_urls: {
            spotify?: string;
        };
    }

    interface RoomTrack extends SpotifyTrack {
        date: number;
    }

    interface PlaylistTrack extends SpotifyTrack {
        date: number;
    }

    interface SpotifyAuthorizeResponse {
        url?: string;
        status: number;
    }

    interface SpotifyTokenResponse {
        access_token: string;
        refresh_token: string;
        token_type: string;
        scope: string;
        expires_in: number;
    }

    interface ApiResponse<T> {
        status: number;
        message: string;
        data: T | null;
    }

    interface AuthResponse {
        url?: string;
    }

    type AuthType = ApiResponse<AuthResponse>;
}
