import { db } from "./index";
import { Api } from "../../types/api";

const clientId = process.env.SPOTIFY_CLIENT_ID;
const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
const redirect_uri = process.env.SPOTIFY_REDIRECT_URI;
const authorization = "Basic " + Buffer.from(clientId + ":" + clientSecret).toString("base64");
const scopes = "streaming user-read-email user-read-private user-modify-playback-state";

export const getSpotifyAccessToken = async (code: string): Promise<Api.SpotifyTokenResponse> => {
    return await db<Api.SpotifyTokenResponse>("https://accounts.spotify.com/api/token", {
        method: "POST",
        headers: {
            Authorization: authorization,
            Content_Type: "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
            grant_type: "authorization_code",
            redirect_uri,
            code,
        }),
    });
};

export const getSpotifyLoginUrl = async (): Promise<Api.SpotifyAuthorizeResponse> => {
    return await db<Api.SpotifyAuthorizeResponse>(
        `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=code&redirect_uri=${redirect_uri}&scope=${scopes}`,
        { method: "GET" }
    );
};
