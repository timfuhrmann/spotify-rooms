import React, { useEffect, useState } from "react";
import { WebsocketContext } from "./WebsocketContext";
import { ConnectingState, Websocket } from "./Websocket";
import { onWelcome, onRoomsUpdate } from "./Listener";
import { Server } from "../../types/server";

export const WebsocketProvider: React.FC = ({ children }) => {
    const [running, setRunning] = useState<boolean>(false);
    const [connecting, setConnecting] = useState<boolean>(true);
    const [rooms, setRooms] = useState<Record<string, Server.Room>>(null);
    const [room, setRoom] = useState<Server.Room>(null);
    const [roomId, setRoomId] = useState<string>("");

    useEffect(() => {
        if (running) {
            disconnect();
        }

        connect();
    }, []);

    useEffect(() => {
        Websocket.onConnecting((state: ConnectingState) => setConnecting(state.connecting));

        Websocket.addMessageHandler("ON_WELCOME", payload => {
            onWelcome(payload, setRooms);
        });

        Websocket.addMessageHandler("ROOMS_UPDATE", payload => {
            onRoomsUpdate(payload, setRooms);
        });
    }, []);

    useEffect(() => {
        if (!rooms || !roomId || roomId === room?.id) {
            return;
        }

        const newRoom = rooms[roomId];

        if (!newRoom) {
            return;
        }

        setRoom(newRoom);
    }, [rooms, roomId]);

    useEffect(() => {
        if (!rooms || !room) {
            return;
        }

        const newRoom = rooms[room.id];

        if (newRoom && newRoom.activeTrack?.id !== room.activeTrack?.id) {
            setRoom(newRoom);
        }
    }, [rooms, room]);

    const connect = () => {
        setRunning(true);
        Websocket.connect();
    };

    const disconnect = () => {
        setRunning(false);
        Websocket.disconnect();
    };

    const leaveRoom = () => {
        Websocket.sendAction("ROOM_LEAVE");
    };

    return (
        <WebsocketContext.Provider
            value={{
                connected: running && !connecting,
                rooms,
                room,
                joinRoomWithId: setRoomId,
                leaveRoom,
            }}>
            {children}
        </WebsocketContext.Provider>
    );
};
