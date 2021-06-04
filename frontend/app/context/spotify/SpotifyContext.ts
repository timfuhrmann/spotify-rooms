import { createContext, useContext } from "react";

interface SpotifyContextData {
    searchActive: boolean;
    activateSearch: () => void;
    deactivateSearch: () => void;
    toggleSearchActive: () => void;
    authToken: string;
    setAuthToken: (token: string) => void;
    deviceId: string;
    setDeviceId: (deviceId: string) => void;
    player: Spotify.Player;
    setPlayer: (player: Spotify.Player) => void;
}

export const SpotifyContext = createContext<SpotifyContextData>({} as SpotifyContextData);

export const useSpotify = () => useContext(SpotifyContext);
