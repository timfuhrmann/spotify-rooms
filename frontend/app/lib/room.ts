import { Server } from "@type/server";

const DEFAULT_TITLE = "Choose your favourite song! - Live Music for Spotify";

export const titleFromRoom = (room: Server.Room): string => {
    if (!room || !room.active) {
        return DEFAULT_TITLE;
    }

    return room.active.name + " - " + room.active.artists.map(artist => artist);
};
