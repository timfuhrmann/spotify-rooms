import React, { useEffect, useState } from "react";
import { SpotifyContext } from "./SpotifyContext";
import { playTrackAtTime } from "../../lib/api/client";
import { Server } from "../../types/server";
import { SpotifyWebPlayer } from "./SpotifyWebPlayer";

interface SpotifyProviderProps {
    token?: string;
}

export const SpotifyProvider: React.FC<SpotifyProviderProps> = ({ children, token }) => {
    const [authToken, setAuthToken] = useState<string>(token);
    const [player, setPlayer] = useState<Spotify.Player>(null);
    const [deviceId, setDeviceId] = useState<string>("");

    useEffect(() => {
        setAuthToken(token);
    }, [token]);

    const playTrack = (track: Server.ResTrack): Promise<unknown> => {
        return playTrackAtTime(authToken, deviceId, track.uri, Date.now() - Date.parse(track.date), setAuthToken);
    };

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
            }}>
            {children}
            {authToken && <SpotifyWebPlayer />}
        </SpotifyContext.Provider>
    );
};
