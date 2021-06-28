import React, { useEffect, useState } from "react";
import { WebsocketContext } from "./WebsocketContext";
import { Server } from "../../types/server";
import { useWebsocket } from "./UseWebsocket";

export const WebsocketProvider: React.FC = ({ children }) => {
    const ws = useWebsocket();
    const [room, setRoom] = useState<Server.Room>(null);
    const [rooms, setRooms] = useState<Record<string, Server.Room>>({});
    const [roomId, setRoomId] = useState<string>("");
    const [playlist, setPlaylist] = useState<Record<string, Server.ResTrack>>({});
    const [votes, setVotes] = useState<number>(0);
    const [viewers, setViewers] = useState<number>(0);

    useEffect(() => {
        if (ws.connected) {
            ws.disconnect();
        }

        ws.connect();
    }, []);

    useEffect(() => {
        ws.addMessageHandler("ON_WELCOME", payload => {
            setRooms(payload);
        });

        ws.addMessageHandler("UPDATE_ROOMS", payload => {
            setRooms(payload);
        });

        ws.addMessageHandler("JOIN_ROOM", payload => {
            setPlaylist(payload);
        });

        ws.addMessageHandler("UPDATE_VOTES", payload => {
            setVotes(payload);
        });

        ws.addMessageHandler("UPDATE_VIEWERS", payload => {
            setViewers(payload);
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
            resetRoom();
        }
    }, [roomId]);

    useEffect(() => {
        if (!rooms || !roomId) {
            return;
        }

        const newRoom = rooms[roomId];

        if (!room || newRoom.active?.uid !== room.active?.uid) {
            setRoom(newRoom);
        }
    }, [rooms, roomId]);

    const addTrackToRoom = (track: Server.ResTrack) => {
        if (!room) {
            return;
        }

        ws.sendAction("ADD_TRACK", { track });
    };

    const joinRoom = (rid: string) => {
        if (!rid) {
            return;
        }

        setRoomId(rid);
        ws.sendAction("JOIN_ROOM", { rid });
    };

    const voteSkip = (rid: string) => {
        if (!rid) {
            return;
        }

        ws.sendAction("VOTE_SKIP", { rid });
    };

    const leaveRoom = () => {
        setRoomId(null);
        ws.sendAction("LEAVE_ROOM");
    };

    const resetRoom = () => {
        setRoom(null);
        setViewers(0);
        setVotes(0);
        setPlaylist({});
    };

    return (
        <WebsocketContext.Provider
            value={{
                connected: ws.connected,
                rooms,
                room,
                playlist,
                addTrackToRoom,
                votes,
                viewers,
                voteSkip,
                joinRoom,
                leaveRoom,
            }}>
            {children}
        </WebsocketContext.Provider>
    );
};
