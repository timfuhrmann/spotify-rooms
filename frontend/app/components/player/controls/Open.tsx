import React from "react";
import { useSpotify } from "../../../context/spotify/SpotifyContext";
import styled from "styled-components";
import { Link } from "../../../icons/Link";

const OpenButton = styled.button`
    position: absolute;
    top: 0;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    color: ${p => p.theme.white};
    background-color: rgba(0, 0, 0, 0.25);
`;

const OpenIcon = styled(Link)`
    width: 2.4rem;
    height: 2.4rem;
`;

interface OpenProps {
    url: string;
}

export const Open: React.FC<OpenProps> = ({ url }) => {
    const { player } = useSpotify();

    const openTrack = async () => {
        await player.pause();
        window.open(url, "_blank");
    };

    if (!url) return null;

    return (
        <OpenButton onClick={openTrack}>
            <OpenIcon />
        </OpenButton>
    );
};
