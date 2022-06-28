import React, { PropsWithChildren, useCallback, useEffect, useState } from "react";
import debounce from "lodash.debounce";
import { SpotifyContext } from "./index";
import { playTrackAtTime } from "@lib/api/client";
import { Server } from "@type/server";
import { SpotifyWebPlayer } from "@lib/spotify";

export const SpotifyProvider: React.FC<PropsWithChildren> = ({ children }) => {
    const [authToken, setAuthToken] = useState<string | null>(null);
    const [player, setPlayer] = useState<Spotify.Player | null>(null);
    const [deviceId, setDeviceId] = useState<string | null>(null);

    useEffect(() => {
        fetch("/api/auth/session")
            .then(res => res.json())
            .then(res => {
                if (res.status === 200) {
                    setAuthToken(res.data.access_token);
                }
            });
    }, []);

    const playTrack = (track: Server.ResTrack) => {
        if (!authToken || !deviceId) {
            return;
        }

        const trackDate = track.date ? Date.parse(track.date) : 0;

        playTrackAtTime(authToken, deviceId, track.uri, Date.now() - trackDate, refreshAccessToken);
    };

    const refreshAccessToken = useCallback(
        debounce(
            async () => {
                const res = await fetch("/api/auth/refresh").then(res => res.json());
                setAuthToken(res.data.access_token);
            },
            10000,
            { leading: true }
        ),
        []
    );

    return (
        <SpotifyContext.Provider
            value={{
                authToken,
                deviceId,
                player,
                playTrack,
                setAuthToken,
                setDeviceId,
                setPlayer,
                refreshAccessToken,
            }}>
            {children}
            {authToken && <SpotifyWebPlayer />}
        </SpotifyContext.Provider>
    );
};
