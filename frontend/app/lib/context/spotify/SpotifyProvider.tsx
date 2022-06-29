import React, { PropsWithChildren, useState } from "react";
import { SpotifyContext } from "./index";
import { playTrackAtTime } from "@lib/api/client";
import { Server } from "@type/server";
import { SpotifyWebPlayer } from "@lib/spotify";
import { useSession } from "@lib/context/session";

export const SpotifyProvider: React.FC<PropsWithChildren> = ({ children }) => {
    const { authToken, refreshAuthToken } = useSession();
    const [player, setPlayer] = useState<Spotify.Player | null>(null);
    const [deviceId, setDeviceId] = useState<string | null>(null);

    const playTrack = async (track: Server.ResTrack) => {
        if (!player || !authToken || !deviceId) {
            return;
        }

        const trackDate = track.date ? Date.parse(track.date) : 0;

        return playTrackAtTime(authToken, deviceId, track.uri, Date.now() - trackDate, refreshAuthToken);
    };

    return (
        <SpotifyContext.Provider
            value={{
                deviceId,
                setDeviceId,
                player,
                setPlayer,
                playTrack,
            }}>
            {children}
            {authToken && <SpotifyWebPlayer />}
        </SpotifyContext.Provider>
    );
};
