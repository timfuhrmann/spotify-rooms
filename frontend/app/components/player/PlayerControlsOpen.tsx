import React from "react";
import { useSpotify } from "@lib/context/spotify";
import styled from "styled-components";
import { Link } from "@icons/Link";
import { fillParent, square } from "@css/helper";

const OpenButton = styled.button`
    ${fillParent};
    display: flex;
    justify-content: center;
    align-items: center;
    color: ${p => p.theme.white};
    background-color: rgba(0, 0, 0, 0.25);
`;

const OpenIcon = styled(Link)`
    ${square("2.4rem")};
`;

interface PlayerControlsOpenProps {
    url: string;
}

export const PlayerControlsOpen: React.FC<PlayerControlsOpenProps> = ({ url }) => {
    const { player } = useSpotify();

    const openTrack = async () => {
        if (player) {
            await player.pause();
        }

        window.open(url, "_blank");
    };

    return (
        <OpenButton onClick={openTrack}>
            <OpenIcon />
        </OpenButton>
    );
};
