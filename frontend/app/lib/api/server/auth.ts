import { db } from "../index";
import { Api } from "@type/api";
import { getBaseUrl } from "@lib/util";
import { Buffer } from "buffer";

const baseUrl = getBaseUrl();

const configSpotify = {
    clientId: process.env.SPOTIFY_CLIENT_ID,
    clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
};

const SPOTIFY_SCOPES = "streaming user-read-email user-read-private user-modify-playback-state";
const SPOTIFY_AUTHORIZATION =
    "Basic " + Buffer.from(configSpotify.clientId + ":" + configSpotify.clientSecret).toString("base64");

export const getSpotifyLoginUrl = (): string => {
    return `https://accounts.spotify.com/authorize?client_id=${configSpotify.clientId}&response_type=code&redirect_uri=${baseUrl}/api/auth/callback&scope=${SPOTIFY_SCOPES}`;
};

export const getSpotifyAccessToken = async (code: string) => {
    return getSpotifyToken({
        grant_type: "authorization_code",
        redirect_uri: baseUrl + "/api/auth/callback",
        code,
    });
};

export const refreshAuthToken = async (refresh_token: string) => {
    return getSpotifyToken({
        grant_type: "refresh_token",
        refresh_token,
    });
};

const getSpotifyToken = async (body: Record<string, string>): Promise<Api.SpotifyTokenResponse> => {
    return db<Api.SpotifyTokenResponse>("https://accounts.spotify.com/api/token", {
        method: "POST",
        headers: {
            Content_Type: "application/x-www-form-urlencoded",
            Authorization: SPOTIFY_AUTHORIZATION,
        },
        body: new URLSearchParams(body),
    });
};
