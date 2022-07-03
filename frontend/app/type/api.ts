import { Server } from "./server";

export namespace Api {
    export interface SpotifySearchResponse {
        tracks: {
            items: Server.Track[];
        };
    }

    export interface SpotifyTokenResponse {
        access_token: string;
        refresh_token: string;
        token_type: string;
        scope: string;
        expires_in: number;
    }

    export interface Response<T> {
        status: number;
        message: string;
        data: T | null;
    }

    export type LoginResponse = Response<{
        url?: string;
    }>;

    export type RefreshResponse = Response<{
        access_token: string;
    }>;

    export type SessionResponse = Response<{
        access_token: string;
    }>;
}
