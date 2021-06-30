import { createContext, useContext } from "react";
import { Server } from "../../types/server";

interface Search {
    active: boolean | null;
    toggle: () => void;
}

interface WebsocketContextData {
    connected: boolean;
    room: Server.Room;
    rooms: Record<string, Server.Room>;
    playlist: Record<string, Server.ResTrack>;
    votes: number;
    viewers: number;
    joinRoom: (rid: string) => void;
    leaveRoom: () => void;
    voteSkip: (rid: string) => void;
    addTrackToRoom: (track: Server.ResTrack) => void;
    search: Search;
}

export const WebsocketContext = createContext<WebsocketContextData>({} as WebsocketContextData);

export const useData = () => useContext(WebsocketContext);
