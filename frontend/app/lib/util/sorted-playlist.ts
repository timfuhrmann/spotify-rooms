import {Server} from "../../types/server";

export const getSortedPlaylist = (arr: string[], map: Record<string, Server.ResTrack>): string[] => {
    return arr.sort((a, b) => {
        const c = Date.parse(map[a].date);
        const d = Date.parse(map[b].date);
        return c - d
    });
}