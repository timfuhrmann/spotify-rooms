import React from "react";
import styled from "styled-components";
import { PlayIcon } from "../../../icons/PlayIcon";

const PlayButton = styled.button`
    position: absolute;
    top: 0;
    left: 0;
    z-index: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    color: ${p => p.theme.white};
`;

const PlayButtonIcon = styled(PlayIcon)`
    width: 8rem;
    height: 8rem;
`;

interface PlayProps {
    onClick: () => void;
}

export const Play: React.FC<PlayProps> = ({ onClick }) => {
    return (
        <PlayButton onClick={onClick}>
            <PlayButtonIcon />
        </PlayButton>
    );
};
