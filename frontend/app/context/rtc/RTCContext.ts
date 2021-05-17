import { createContext, useContext } from "react";
import { Api } from "../../types/api";
import { FirebaseDocument } from "./RTCProvider";

interface RTCContextData {
    playlist: Api.PlaylistTrack[];
    addTrackToPlaylist: (roomId: string, track: Api.SpotifyTrack) => Promise<FirebaseDocument>;
}

export const RTCContext = createContext<RTCContextData>({} as RTCContextData);

export const useRTC = () => useContext(RTCContext);
