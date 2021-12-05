import { db } from "./index";
import { Api } from "../../types/api";
import { debounce } from "lodash";
import { configSpotify } from "../config/spotfiy";
import { getBaseUrl } from "../config/app";

const { clientId, clientSecret } = configSpotify;
const baseUrl = getBaseUrl();

const SPOTIFY_AUTHORIZATION = "Basic " + Buffer.from(clientId + ":" + clientSecret).toString("base64");
const SPOTIFY_SCOPES = "streaming user-read-email user-read-private user-modify-playback-state";

export const requestSpotifyLoginUrl = async (): Promise<Api.AuthType> => {
    return await db<Api.AuthType>("/api/auth");
};

export const getSpotifyLoginUrl = async (): Promise<Api.SpotifyAuthorizeResponse> => {
    return await db<Api.SpotifyAuthorizeResponse>(
        `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=code&redirect_uri=${baseUrl}/api/callback&scope=${SPOTIFY_SCOPES}`,
        { method: "GET" }
    );
};

export const getSpotifyAccessToken = async (code: string): Promise<Api.SpotifyTokenResponse> => {
    return await db<Api.SpotifyTokenResponse>("https://accounts.spotify.com/api/token", {
        method: "POST",
        headers: {
            Authorization: SPOTIFY_AUTHORIZATION,
            Content_Type: "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
            grant_type: "authorization_code",
            redirect_uri: baseUrl + "/api/callback",
            code,
        }),
    });
};

export const refreshAccessToken = async (refresh_token: string): Promise<Api.SpotifyTokenResponse> => {
    return await db("https://accounts.spotify.com/api/token", {
        method: "POST",
        headers: {
            Content_Type: "application/x-www-form-urlencoded",
            Authorization: SPOTIFY_AUTHORIZATION,
        },
        body: new URLSearchParams({
            grant_type: "refresh_token",
            refresh_token,
        }),
    });
};

export const clientRequestRefresh = debounce(
    async () => {
        const res = await fetch("/api/refresh").then(res => res.json());
        return res.data.access_token;
    },
    10000,
    { leading: true }
);
