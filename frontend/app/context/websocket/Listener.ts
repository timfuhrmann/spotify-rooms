import { Server } from "../../types/server";

export const onWelcome = (
    payload: Record<string, Server.Room>,
    setRooms: (rooms: Record<string, Server.Room>) => void
) => {
    setRooms(payload);
};

export const onRoomJoin = (payload: Server.Room, setRoom: (room: Server.Room) => void) => {
    setRoom(payload);
};

export const onRoomUpdate = (payload: Server.Room, setRoom: (room: Server.Room) => void) => {
    setRoom(payload);
};

export const onRoomsUpdate = (
    payload: Record<string, Server.Room>,
    setRooms: (rooms: Record<string, Server.Room>) => void
) => {
    setRooms(payload);
};
