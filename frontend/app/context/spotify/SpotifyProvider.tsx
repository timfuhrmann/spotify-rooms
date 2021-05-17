import React, { useState } from "react";
import dynamic from "next/dynamic";
import { SpotifyContext } from "./SpotifyContext";
import { useRTC } from "../rtc/RTCContext";
import { useWebsocket } from "../websocket/WebsocketContext";

const Spotify = dynamic(() => import("./SpotifyInit").then(mod => mod.SpotifyInit), {
    ssr: false,
});

interface SpotifyProviderProps {
    authToken?: string;
}

export const SpotifyProvider: React.FC<SpotifyProviderProps> = ({ children, authToken }) => {
    const { room } = useWebsocket();
    const [player, setPlayer] = useState<Spotify.Player>(null);
    const [deviceId, setDeviceId] = useState<string>("");

    return (
        <SpotifyContext.Provider
            value={{
                authToken,
                deviceId,
                setDeviceId,
                player,
                setPlayer,
            }}>
            {children}
            {room && authToken && <Spotify authToken={authToken} />}
        </SpotifyContext.Provider>
    );
};
