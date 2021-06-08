import { createContext, useContext } from "react";
import { Server } from "../../types/server";

interface SpotifyContextData {
    searchActive: boolean;
    activateSearch: () => void;
    deactivateSearch: () => void;
    toggleSearchActive: () => void;
    playTrack: (track: Server.ResTrack) => Promise<unknown>;
    authToken: string;
    setAuthToken: (token: string) => void;
    deviceId: string;
    setDeviceId: (deviceId: string) => void;
    player: Spotify.Player;
    setPlayer: (player: Spotify.Player) => void;
}

export const SpotifyContext = createContext<SpotifyContextData>({} as SpotifyContextData);

export const useSpotify = () => useContext(SpotifyContext);
