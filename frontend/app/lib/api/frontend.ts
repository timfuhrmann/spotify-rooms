import { db } from "./index";
import { Api } from "../../types/api";
import { Server } from "../../types/server";

const setJsonHeaders = (authToken: string) => {
    return {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
    };
};

export const getTrackByString = async (
    authToken: string,
    str: string,
    setAuthToken: (token: string) => void
): Promise<Server.ResTrack[]> => {
    const res = await db<Api.SpotifySearchResponse>(
        `https://api.spotify.com/v1/search?q=${str}&type=track&limit=10`,
        {
            method: "GET",
            headers: {
                Authorization: `Bearer ${authToken}`,
            },
        },
        setAuthToken
    );

    if (!res.tracks) {
        return [];
    }

    return res.tracks.items.map(track => {
        return {
            id: track.id,
            name: track.name,
            duration_ms: track.duration_ms,
            artists: track.artists.map(artist => artist.name),
            album: {
                name: track.album.name,
                images: track.album.images.map(image => image.url),
            },
        };
    });
};

export const getTrackById = async (
    authToken: string,
    id: string,
    setAuthToken: (token: string) => void
): Promise<Spotify.Track> => {
    return await db(
        `https://api.spotify.com/v1/tracks/${id}`,
        {
            method: "GET",
            headers: {
                Authorization: `Bearer ${authToken}`,
            },
        },
        setAuthToken
    );
};

export const playTrackAtTime = async (
    authToken: string,
    deviceId: string,
    track: string,
    time: number,
    setAuthToken: (token: string) => void
) => {
    return await db(
        `https://api.spotify.com/v1/me/player/play?device_id=${deviceId}`,
        {
            method: "PUT",
            body: JSON.stringify({
                uris: [track],
                position_ms: time,
            }),
            headers: setJsonHeaders(authToken),
        },
        setAuthToken
    );
};

export const setVolumeForCurrentTrack = async (
    authToken: string,
    deviceId: string,
    volume: number,
    setAuthToken: (token: string) => void
) => {
    return await db(
        `https://api.spotify.com/v1/me/player/volume?volume_percent=${volume}&device_id=${deviceId}`,
        {
            method: "PUT",
            headers: setJsonHeaders(authToken),
        },
        setAuthToken
    );
};
