import { createContext, useContext } from "react";
import { Server } from "../../types/server";

interface SpotifyContextData {
    authToken: string;
    deviceId: string;
    player: Spotify.Player;
    playTrack: (track: Server.ResTrack) => Promise<unknown>;
    setAuthToken: (token: string) => void;
    setDeviceId: (deviceId: string) => void;
    setPlayer: (player: Spotify.Player) => void;
}

export const SpotifyContext = createContext<SpotifyContextData>({} as SpotifyContextData);

export const useSpotify = () => useContext(SpotifyContext);
