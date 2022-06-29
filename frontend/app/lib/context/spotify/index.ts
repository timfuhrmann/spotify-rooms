import { createContext, useContext } from "react";
import { Server } from "@type/server";

interface SpotifyContextData {
    deviceId: string | null;
    player: Spotify.Player | null;
    playTrack: (track: Server.ResTrack) => void;
    setDeviceId: (deviceId: string) => void;
    setPlayer: (player: Spotify.Player) => void;
}

export const SpotifyContext = createContext<SpotifyContextData>({} as SpotifyContextData);

export const useSpotify = () => useContext(SpotifyContext);
