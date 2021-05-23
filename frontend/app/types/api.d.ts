import { Server } from "./server";

export module Api {
    interface SpotifySearchResponse {
        tracks: {
            items: Server.Track[];
        };
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

    interface RefreshResponse {
        access_token: string;
    }

    type AuthType = ApiResponse<AuthResponse>;

    type RefreshType = ApiResponse<RefreshResponse>;
}
