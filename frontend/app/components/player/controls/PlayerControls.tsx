import React, { useEffect, useState } from "react";
import { setVolumeForCurrentTrack } from "../../../lib/api/frontend";
import { useSpotify } from "../../../context/spotify/SpotifyContext";
import { useData } from "../../../context/websocket/WebsocketContext";
import { Skip } from "./Skip";
import { Volume } from "./Volume";
import { Server } from "../../../types/server";
import styled from "styled-components";
import { Open } from "./Open";

const ControlsWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 1rem;
`;

const ControlsGroup = styled.div`
    display: flex;
    align-items: center;
`;

const VolumeWrapper = styled.div`
    margin-right: 1rem;
`;

interface PlayerControlsProps {
    room: Server.Room;
}

export const PlayerControls: React.FC<PlayerControlsProps> = ({ room }) => {
    const { authToken, setAuthToken, deviceId } = useSpotify();
    const { votes, voteSkip } = useData();
    const [muted, setMuted] = useState<boolean>(false);
    const [voted, setVoted] = useState<string | null>(null);

    useEffect(() => {
        if (room.active && room.active.id !== voted) {
            setVoted(null);
        }
    }, [room]);

    const toggleMute = async () => {
        if (muted) {
            await setVolumeForCurrentTrack(authToken, deviceId, 100, setAuthToken);
            setMuted(false);
        } else {
            await setVolumeForCurrentTrack(authToken, deviceId, 0, setAuthToken);
            setMuted(true);
        }
    };

    const voteForSkip = () => {
        if (voted !== null) {
            return;
        }

        voteSkip(room.id);
        setVoted(room.active.id);
    };

    return (
        <ControlsWrapper>
            <Open track={room.active} />
            <ControlsGroup>
                <VolumeWrapper>
                    <Volume muted={muted} onClick={toggleMute} />
                </VolumeWrapper>
                <Skip active={!!voted} overlineValue={votes} onClick={voteForSkip} />
            </ControlsGroup>
        </ControlsWrapper>
    );
};
