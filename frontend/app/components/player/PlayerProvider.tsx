import React, { createContext, PropsWithChildren, useContext, useEffect, useState } from "react";
import { Server } from "@type/server";
import { useSpotify } from "@lib/context/spotify";
import { useData } from "@lib/context/websocket";
import { useSession } from "@lib/context/session";

interface PlayerContextData {
    track: Server.ResTrack | null;
    inactive: boolean;
}

const PlayerContext = createContext<PlayerContextData>({} as PlayerContextData);

export const PlayerProvider: React.FC<PropsWithChildren> = ({ children }) => {
    const { room } = useData();
    const { authToken } = useSession();
    const { deviceId, player, playTrack } = useSpotify();
    const [track, setTrack] = useState<Server.ResTrack | null>(null);
    const [inactive, setInactive] = useState<boolean>(false);

    useEffect(() => {
        if (!authToken || !deviceId || !room || !player) {
            return;
        }

        if (!room.active) {
            setTrack(null);
            player.pause().catch(console.error);
            return;
        }

        setTrack(room.active);
    }, [authToken, deviceId, room]);

    useEffect(() => {
        if (!track || !player) {
            return;
        }

        playTrack(track);

        return () => {
            player.pause();
        };
    }, [track]);

    useEffect(() => {
        if (track) {
            setInactive(false);
        }

        const timeout = setTimeout(() => {
            setInactive(true);
        }, 2000);

        return () => {
            clearTimeout(timeout);
            setInactive(false);
        };
    }, [track]);

    return <PlayerContext.Provider value={{ track, inactive }}>{children}</PlayerContext.Provider>;
};

export const withPlayer = <T,>(WrappedComponent: React.ComponentType<T>) => {
    const displayName = WrappedComponent.displayName || WrappedComponent.name || "Component";

    const ComponentWithProvider = (props: T) => {
        return (
            <PlayerProvider {...props}>
                <WrappedComponent {...props} />
            </PlayerProvider>
        );
    };

    ComponentWithProvider.displayName = `withPlayer(${displayName})`;

    return ComponentWithProvider;
};

export const usePlayer = () => useContext(PlayerContext);
