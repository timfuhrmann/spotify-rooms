export namespace Server {
    export enum Events {
        OnWelcome = "ON_WELCOME",
        UpdateRooms = "UPDATE_ROOMS",
        JoinRoom = "JOIN_ROOM",
        UpdateVotes = "UPDATE_VOTES",
        UpdateViewers = "UPDATE_VIEWERS",
        UpdatePlaylist = "UPDATE_PLAYLIST",
    }

    export enum Actions {
        JoinRoom = "JOIN_ROOM",
        AddTrack = "ADD_TRACK",
        VoteSkip = "VOTE_SKIP",
        LeaveRoom = "LEAVE_ROOM",
    }

    export interface Room {
        id: string;
        name: string;
        active?: ResTrack;
    }

    export interface Track extends Spotify.Track {
        duration_ms: number;
        external_urls: {
            spotify?: string;
        };
    }

    export interface ResTrack {
        uid: string;
        id: string;
        name: string;
        duration_ms: number;
        artists: string[];
        album: ResAlbum;
        uri: string;
        date?: string;
        url?: string;
    }

    export interface ResAlbum {
        name: string;
        images: string[];
    }
}
