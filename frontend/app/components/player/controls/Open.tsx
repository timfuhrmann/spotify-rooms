import React from "react";
import { Server } from "../../../types/server";
import { useSpotify } from "../../../context/spotify/SpotifyContext";
import styled from "styled-components";
import { Link } from "../../../icons/Link";

const OpenButton = styled.button`
    display: block;
`;

const OpenIcon = styled(Link)`
    width: 2.1rem;
    height: 2.1rem;
`;

interface OpenProps {
    track: Server.ResTrack;
}

export const Open: React.FC<OpenProps> = ({ track }) => {
    const { player } = useSpotify();

    const openTrack = async () => {
        await player.pause();
        window.open(track.url, "_blank");
    };

    if (!track || !track.url) return null;

    return (
        <OpenButton onClick={openTrack}>
            <OpenIcon />
        </OpenButton>
    );
};
