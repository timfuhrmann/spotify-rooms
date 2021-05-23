import React, { useEffect, useState } from "react";
import { WebsocketContext } from "./WebsocketContext";
import { Server } from "../../types/server";
import { useWebsocket } from "./UseWebsocket";

export const WebsocketProvider: React.FC = ({ children }) => {
    const ws = useWebsocket();
    const gws = useWebsocket();
    const [room, setRoom] = useState<Server.Room>(null);
    const [rooms, setRooms] = useState<Record<string, Server.Room>>({});
    const [roomId, setRoomId] = useState<string>("");
    const [playlist, setPlaylist] = useState<Record<string, Server.ResTrack>>({});

    useEffect(() => {
        if (gws.connected) {
            gws.disconnect();
        }

        gws.connect("");
    }, []);

    useEffect(() => {
        gws.addMessageHandler("ON_WELCOME", payload => {
            setRooms(payload);
        });

        gws.addMessageHandler("UPDATE_ROOMS", payload => {
            setRooms(payload);
        });

        ws.addMessageHandler("ON_WELCOME", payload => {
            setPlaylist(payload);
        });

        ws.addMessageHandler("UPDATE_PLAYLIST", payload => {
            if (!payload) {
                return;
            }

            setPlaylist(payload);
        });
    }, []);

    useEffect(() => {
        if (!roomId) {
            setRoom(null);
            return;
        }

        if (ws.connected) {
            ws.disconnect();
        }

        ws.connect(roomId);
    }, [roomId]);

    useEffect(() => {
        if (!rooms || !roomId) {
            return;
        }

        const r = rooms[roomId];

        if (!room || r.active?.id !== room.active?.id) {
            setRoom(r);
        }
    }, [rooms, roomId]);

    const addTrackToRoom = (track: Server.ResTrack) => {
        if (!room) {
            return;
        }

        ws.sendAction("ADD_TRACK", { ...track, rid: room.id });
    };

    return (
        <WebsocketContext.Provider
            value={{
                connected: ws.connected,
                rooms,
                room,
                playlist,
                setRoomId,
                addTrackToRoom,
            }}>
            {children}
        </WebsocketContext.Provider>
    );
};
