import { createContext, useContext } from "react";
import { Server } from "../../types/server";

interface WebsocketContextData {
    connected: boolean;
    playlist: Record<string, Server.ResTrack>;
    rooms: Record<string, Server.Room>;
    room: Server.Room;
    addTrackToRoom: (track: Server.ResTrack) => void;
    joinRoom: (rid: string) => void;
    votes: number;
    voteSkip: (rid: string) => void;
    leaveRoom: () => void;
}

export const WebsocketContext = createContext<WebsocketContextData>({} as WebsocketContextData);

export const useData = () => useContext(WebsocketContext);
