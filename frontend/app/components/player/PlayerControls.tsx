import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useData } from "@lib/context/websocket";
import { PlayerControlsSkip } from "./PlayerControlsSkip";
import { PlayerControlsVolume } from "./PlayerControlsVolume";
import { PlayerControlsPlay } from "./PlayerControlsPlay";
import { usePlayer } from "./PlayerProvider";

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
    const { track } = usePlayer();
    const { votes, voteSkip } = useData();
    const [voted, setVoted] = useState<string | null>(null);

    useEffect(() => {
        if (track && track.uid !== voted) {
            setVoted(null);
        }
    }, [track]);

    const voteForSkip = () => {
        if (!track || voted !== null) {
            return;
        }

        voteSkip(track.uid);
        setVoted(track.uid);
    };

    return (
        <ControlsWrapper>
            <ControlsGroup>
                <PlayWrapper>
                    <PlayerControlsPlay />
                </PlayWrapper>
                <PlayerControlsSkip active={!!voted} overlineValue={votes} onClick={voteForSkip} />
            </ControlsGroup>
            <PlayerControlsVolume />
        </ControlsWrapper>
    );
};
