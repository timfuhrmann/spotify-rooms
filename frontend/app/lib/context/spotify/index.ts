import { createContext, useContext } from "react";
import { Server } from "@type/server";

interface SpotifyContextData {
    deviceId: string | null;
    setDeviceId: (deviceId: string) => void;
    player: Spotify.Player | null;
    setPlayer: (player: Spotify.Player) => void;
    playTrack: (track: Server.ResTrack) => Promise<unknown | undefined>;
}

export const SpotifyContext = createContext<SpotifyContextData>({} as SpotifyContextData);

export const useSpotify = () => useContext(SpotifyContext);
