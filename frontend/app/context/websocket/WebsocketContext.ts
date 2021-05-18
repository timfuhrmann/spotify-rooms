import { createContext, useContext } from "react";
import { Server } from "../../types/server";

interface WebsocketContextData {
    connected: boolean;
    playlist: Record<string, Server.ResTrack>;
    rooms: Record<string, Server.Room>;
    room: Server.Room;
    joinRoomWithId: (rid: string) => void;
    addTrackToRoom: (track: Server.ResTrack) => void;
}

export const WebsocketContext = createContext<WebsocketContextData>({} as WebsocketContextData);

export const useData = () => useContext(WebsocketContext);
