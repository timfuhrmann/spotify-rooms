import React, { PropsWithChildren, useEffect, useState } from "react";
import { WebsocketContext } from "./index";
import { Server } from "@type/server";
import { useWebsocket } from "@lib/hook/useWebsocket";

export const WebsocketProvider: React.FC<PropsWithChildren> = ({ children }) => {
    const ws = useWebsocket();
    const [room, setRoom] = useState<Server.Room | null>(null);
    const [rooms, setRooms] = useState<Record<string, Server.Room>>({});
    const [roomId, setRoomId] = useState<string | null>(null);
    const [playlist, setPlaylist] = useState<Record<string, Server.ResTrack>>({});
    const [votes, setVotes] = useState<number>(0);
    const [viewers, setViewers] = useState<number>(0);
    const [searchActive, setSearchActive] = useState<boolean | null>(null);

    useEffect(() => {
        if (ws.connected) {
            ws.disconnect();
        }

        ws.connect();
    }, []);

    useEffect(() => {
        ws.addMessageHandler(Server.Events.OnWelcome, setRooms);
        ws.addMessageHandler(Server.Events.UpdateRooms, setRooms);
        ws.addMessageHandler(Server.Events.JoinRoom, setPlaylist);
        ws.addMessageHandler(Server.Events.UpdateVotes, setVotes);
        ws.addMessageHandler(Server.Events.UpdateViewers, setViewers);
        ws.addMessageHandler(Server.Events.UpdatePlaylist, setPlaylist);
    }, []);

    useEffect(() => {
        return () => resetRoom();
    }, [roomId]);

    useEffect(() => {
        if (!rooms || !roomId) {
            return;
        }

        const newRoom = rooms[roomId];

        if (!room || newRoom.active?.uid !== room.active?.uid) {
            setRoom(newRoom);
            setSearchActive(true);
        }
    }, [rooms, roomId]);

    const addTrackToRoom = (track: Server.ResTrack) => {
        if (!room) {
            return;
        }

        ws.sendAction(Server.Actions.AddTrack, { track });
    };

    const joinRoom = (rid: string) => {
        setRoomId(rid);
        ws.sendAction(Server.Actions.JoinRoom, { rid });
    };

    const voteSkip = (rid: string) => {
        ws.sendAction(Server.Actions.VoteSkip, { rid });
    };

    const leaveRoom = () => {
        setRoomId(null);
        ws.sendAction(Server.Actions.LeaveRoom);
    };

    const resetRoom = () => {
        setRoom(null);
        setViewers(0);
        setVotes(0);
        setPlaylist({});
        setSearchActive(null);
    };

    return (
        <WebsocketContext.Provider
            value={{
                connected: ws.connected,
                room,
                rooms,
                playlist,
                votes,
                viewers,
                joinRoom,
                leaveRoom,
                addTrackToRoom,
                voteSkip,
                search: {
                    active: searchActive,
                    toggle: () => setSearchActive(prevState => !prevState),
                },
            }}>
            {children}
        </WebsocketContext.Provider>
    );
};
