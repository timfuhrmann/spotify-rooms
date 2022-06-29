import React from "react";
import styled from "styled-components";
import Image from "next/image";
import { ActiveTitle } from "@css/typography";
import { PlayerControls } from "./PlayerControls";
import { aspectRatio, centerAbsolute, hover, transition } from "@css/helper";
import { PlayerControlsOpen } from "./PlayerControlsOpen";
import { usePlayer, withPlayer } from "./PlayerProvider";
import { breakpoints } from "@css/helper/breakpoints";

const PlayerFrame = styled.div`
    position: relative;
    width: 100%;
    margin: 0 auto;
    max-width: 40rem;
`;

const PlayerInner = styled.div`
    opacity: 0;
    animation: player-fade-in 0.5s ease forwards;

    @keyframes player-fade-in {
        100% {
            opacity: 1;
        }
    }
`;

const ActiveTitleWrapper = styled.div`
    margin-bottom: 0.5rem;

    ${breakpoints().min("l")} {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        transform: translateY(calc(-100% - 0.5rem));
        margin-bottom: 0;
    }
`;

const ArtistNameWrapper = styled.div`
    display: block;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    max-width: 100%;
    opacity: 0.6;
    font-size: 2rem;
`;

const CoverWrapper = styled.div`
    position: relative;
    ${aspectRatio(1)};
`;

const PlayerInfo = styled.div`
    ${centerAbsolute};
    width: 100%;
    text-align: center;
    opacity: 0;
    pointer-events: none;
    animation: player-fade-in 0.5s ease forwards;

    @keyframes player-fade-in {
        100% {
            opacity: 1;
        }
    }
`;

const OpenWrapper = styled.div`
    opacity: 0;
    ${transition("opacity", "0.1s")};

    ${hover`
        opacity: 1;
    `};

    @media (hover: none) {
        pointer-events: none;
    }
`;

export const Player = withPlayer(() => {
    const { track, inactive } = usePlayer();

    return (
        <PlayerFrame>
            {inactive && (
                <PlayerInfo>It seems there is no music to play. Go a ahead and choose you favourite song!</PlayerInfo>
            )}
            {track && (
                <PlayerInner>
                    <ActiveTitleWrapper>
                        <ActiveTitle>
                            {track.name}
                            <ArtistNameWrapper>{track.artists.join(", ")}</ArtistNameWrapper>
                        </ActiveTitle>
                    </ActiveTitleWrapper>
                    <CoverWrapper>
                        <Image
                            src={track.album.images[0]}
                            alt={track.name}
                            layout="fill"
                            objectFit="cover"
                            unoptimized
                        />
                        {track.url && (
                            <OpenWrapper>
                                <PlayerControlsOpen url={track.url} />
                            </OpenWrapper>
                        )}
                    </CoverWrapper>
                    <PlayerControls />
                </PlayerInner>
            )}
        </PlayerFrame>
    );
});
