import { createContext, useContext } from "react";
import { Server } from "../../types/server";

interface WebsocketContextData {
    connected: boolean;
    rooms: Record<string, Server.Room>;
    room: Server.Room;
    joinRoomWithId: (rid: string) => void;
    leaveRoom: () => void;
}

export const WebsocketContext = createContext<WebsocketContextData>({} as WebsocketContextData);

export const useWebsocket = () => useContext(WebsocketContext);
