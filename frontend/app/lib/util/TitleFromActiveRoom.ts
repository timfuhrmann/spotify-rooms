import { Server } from "../../types/server";

export const getTitleFromActiveRoom = (track: Server.ResTrack): string => {
    if (track) {
        return track.name + " - " + track.artists.map(artist => artist);
    } else {
        return "Choose your favourite song! - Live Music for Spotify";
    }
};
