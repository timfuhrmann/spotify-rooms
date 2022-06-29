import { db } from "../index";
import { Api } from "@type/api";
import { Server } from "@type/server";

const getJsonHeaders = (authToken: string) => {
    return {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
    };
};

export const getTrackByString = async (
    authToken: string,
    str: string,
    onAuthError: () => void
): Promise<Server.ResTrack[]> => {
    const res = await db<Api.SpotifySearchResponse>(
        `https://api.spotify.com/v1/search?q=${str}&type=track&limit=10`,
        {
            method: "GET",
            headers: {
                Authorization: `Bearer ${authToken}`,
            },
        },
        onAuthError
    );

    if (!res.tracks) {
        return [];
    }

    return res.tracks.items.flatMap(track => {
        if (!track.id) {
            return [];
        }

        return {
            uid: track.id, // fallback, will be overwritten by backend
            id: track.id,
            name: track.name,
            duration_ms: track.duration_ms,
            artists: track.artists.map(artist => artist.name),
            url: track.external_urls.spotify,
            uri: track.uri,
            album: {
                name: track.album.name,
                images: track.album.images.map(image => image.url),
            },
        };
    });
};

export const playTrackAtTime = async (
    authToken: string,
    deviceId: string,
    track: string,
    time: number,
    onAuthError: () => void
) => {
    return db(
        `https://api.spotify.com/v1/me/player/play?device_id=${deviceId}`,
        {
            method: "PUT",
            body: JSON.stringify({
                uris: [track],
                position_ms: time,
            }),
            headers: getJsonHeaders(authToken),
        },
        onAuthError
    );
};
