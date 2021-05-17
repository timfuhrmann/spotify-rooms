import React, { useEffect, useState } from "react";
import { RTCContext } from "./RTCContext";
import firebase from "../../../firebase";
import { Api } from "../../types/api";
import { useWebsocket } from "../websocket/WebsocketContext";

export type FirebaseDocument = firebase.firestore.DocumentReference<firebase.firestore.DocumentData>;

export const RTCProvider: React.FC = ({ children }) => {
    const { room } = useWebsocket();
    const [playlist, setPlaylist] = useState<Api.PlaylistTrack[]>([]);

    useEffect(() => {
        if (!room) {
            return;
        }

        firebase
            .firestore()
            .collection(`rooms/${room.id}/upcomingTracks`)
            .limit(100)
            .onSnapshot(async snapshot => {
                const upcomingTracks = snapshot.docs.map(doc => doc.data()) as Api.PlaylistTrack[];
                setPlaylist(upcomingTracks);
            });
    }, [room]);

    const addTrackToPlaylist = (roomId: string, track: Api.SpotifyTrack): Promise<FirebaseDocument> => {
        const { id, name, artists, album, duration_ms } = track;
        return firebase
            .firestore()
            .collection(`rooms/${roomId}/upcomingTracks`)
            .add({ id, name, artists, album, duration_ms, date: Date.now() });
    };

    return (
        <RTCContext.Provider
            value={{
                playlist,
                addTrackToPlaylist,
            }}>
            {children}
        </RTCContext.Provider>
    );
};
