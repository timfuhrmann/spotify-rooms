import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { SpotifyContext } from "./SpotifyContext";
import { useData } from "../websocket/WebsocketContext";

const Spotify = dynamic(() => import("./SpotifyInit").then(mod => mod.SpotifyInit), {
    ssr: false,
});

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

    return (
        <SpotifyContext.Provider
            value={{
                searchActive,
                activateSearch: () => setSearchActive(true),
                deactivateSearch: () => setSearchActive(null),
                toggleSearchActive: () => setSearchActive(prevState => !prevState),
                authToken,
                setAuthToken,
                deviceId,
                setDeviceId,
                player,
                setPlayer,
            }}>
            {children}
            {authToken && <Spotify authToken={authToken} />}
        </SpotifyContext.Provider>
    );
};
