import React, { useEffect, useState } from "react";
import { SpotifyContext } from "./SpotifyContext";
import { playTrackAtTime } from "../../lib/api/frontend";
import { Server } from "../../types/server";
import { SpotifyInit } from "./SpotifyInit";

interface SpotifyProviderProps {
    token?: string;
}

export const SpotifyProvider: React.FC<SpotifyProviderProps> = ({ children, token }) => {
    const [searchActive, setSearchActive] = useState<boolean | null>(null);
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
                searchActive,
                activateSearch: () => setSearchActive(true),
                deactivateSearch: () => setSearchActive(null),
                toggleSearchActive: () => setSearchActive(prevState => !prevState),
                playTrack,
                authToken,
                setAuthToken,
                deviceId,
                setDeviceId,
                player,
                setPlayer,
            }}>
            {children}
            {authToken && <SpotifyInit authToken={authToken} />}
        </SpotifyContext.Provider>
    );
};
