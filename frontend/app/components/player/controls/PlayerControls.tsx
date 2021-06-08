import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useData } from "../../../context/websocket/WebsocketContext";
import { Skip } from "./Skip";
import { Volume } from "./Volume";
import { Server } from "../../../types/server";
import { Play } from "./Play";

const ControlsWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 0.5rem;
`;

const ControlsGroup = styled.div`
    display: flex;
    align-items: center;
`;

const PlayWrapper = styled.div`
    margin-right: 1rem;
`;

export const PlayerControls: React.FC = () => {
    const { room, votes, voteSkip } = useData();
    const [voted, setVoted] = useState<string | null>(null);

    useEffect(() => {
        if (room.active && room.active.uid !== voted) {
            setVoted(null);
        }
    }, [room]);

    const voteForSkip = () => {
        if (voted !== null) {
            return;
        }

        voteSkip(room.id);
        setVoted(room.active.uid);
    };

    return (
        <ControlsWrapper>
            <ControlsGroup>
                <PlayWrapper>
                    <Play />
                </PlayWrapper>
                <Skip active={!!voted} overlineValue={votes} onClick={voteForSkip} />
            </ControlsGroup>
            <Volume />
        </ControlsWrapper>
    );
};
