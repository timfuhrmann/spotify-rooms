import { db } from "./index";
import { Api } from "@type/api";
import { configSpotify } from "./spotfiy";
import { getBaseUrl } from "../util";
import { Buffer } from "buffer";

const { clientId, clientSecret } = configSpotify;
const baseUrl = getBaseUrl();

const SPOTIFY_AUTHORIZATION = "Basic " + Buffer.from(clientId + ":" + clientSecret).toString("base64");
const SPOTIFY_SCOPES = "streaming user-read-email user-read-private user-modify-playback-state";

export const getSpotifyLoginUrl = (): string => {
    return `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=code&redirect_uri=${baseUrl}/api/auth/callback&scope=${SPOTIFY_SCOPES}`;
};

export const getSpotifyAccessToken = async (code: string): Promise<Api.SpotifyTokenResponse> => {
    return db<Api.SpotifyTokenResponse>("https://accounts.spotify.com/api/token", {
        method: "POST",
        headers: {
            Authorization: SPOTIFY_AUTHORIZATION,
            Content_Type: "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
            grant_type: "authorization_code",
            redirect_uri: baseUrl + "/api/auth/callback",
            code,
        }),
    });
};

export const refreshAuthToken = async (refresh_token: string): Promise<Api.SpotifyTokenResponse> => {
    return db("https://accounts.spotify.com/api/token", {
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
