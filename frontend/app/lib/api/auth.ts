import { db } from "./index";
import { Api } from "../../types/api";

export const refreshAccessToken = async (refresh_token: string): Promise<Api.SpotifyTokenResponse> => {
    return await db("https://accounts.spotify.com/api/token", {
        method: "POST",
        headers: {
            Content_Type: "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
            grant_type: "refresh_token",
            refresh_token,
        }),
    });
};
