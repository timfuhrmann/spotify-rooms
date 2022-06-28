import { Server } from "@type/server";

export const getBaseUrl = () => {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

    if (!baseUrl) {
        throw new Error("Environment variable NEXT_PUBLIC_BASE_URL seems to be undefined.");
    }

    return baseUrl;
};

export const getSortedPlaylist = (arr: string[], map: Record<string, Server.ResTrack>): string[] => {
    return arr.sort((a, b) => {
        const aDate = map[a].date;
        const bDate = map[b].date;

        if (!aDate || !bDate) {
            return 0;
        }

        return Date.parse(aDate) - Date.parse(bDate);
    });
};
