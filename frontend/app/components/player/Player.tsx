import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Image from "next/image";
import { ActiveTitle } from "../../css/typography";
import { useSpotify } from "../../context/spotify/SpotifyContext";
import { Server } from "../../types/server";
import { PlayerControls } from "./controls/PlayerControls";
import { aspectRatio } from "../../css/content";
import { Open } from "./controls/Open";

const PlayerFrame = styled.div`
    position: relative;
    width: 100%;
    margin: 0 auto;
    max-width: 40rem;

    @media ${p => p.theme.bp.l} {
        width: 40rem;
    }
`;

const PlayerInner = styled.div`
    opacity: 0;
    animation: fade-in 0.5s ease forwards;

    @keyframes fade-in {
        100% {
            opacity: 1;
        }
    }
`;

const ActiveTitleWrapper = styled.div`
    margin-bottom: 0.5rem;

    @media ${p => p.theme.bp.l} {
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

const PlayerInfo = styled.div<{ visible: boolean }>`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 100%;
    text-align: center;
    opacity: ${p => (p.visible ? 1 : 0)};
    transition: opacity 0.3s;
    pointer-events: none;
`;

const OpenWrapper = styled.div`
    opacity: 0;
    transition: opacity 0.2s;
    will-change: opacity;

    @media (hover: hover) {
        &:hover {
            opacity: 1;
        }
    }

    @media (hover: none) {
        pointer-events: none;
    }
`;

interface PlayerProps {
    room: Server.Room;
}

export const Player: React.FC<PlayerProps> = ({ room }) => {
    const { authToken, deviceId, player, playTrack } = useSpotify();
    const [track, setTrack] = useState<Server.ResTrack>(null);
    const [inactive, setInactive] = useState<boolean>(false);

    useEffect(() => {
        if (!authToken || !deviceId || !room) {
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
        if (!track) {
            return;
        }

        playTrack(track).catch(console.error);

        return () => {
            player.pause().catch(console.error);
        };
    }, [track]);

    useEffect(() => {
        let timeout: NodeJS.Timeout;

        if (!track) {
            timeout = setTimeout(() => {
                setInactive(true);
            }, 2000);
        } else {
            setInactive(false);
        }

        return () => {
            clearTimeout(timeout);
            setInactive(false);
        };
    }, [track]);

    return (
        <PlayerFrame>
            <PlayerInfo visible={inactive}>
                It seems there is no music to play. Go a ahead and choose you favourite song!
            </PlayerInfo>
            {track && (
                <PlayerInner>
                    <ActiveTitleWrapper>
                        <ActiveTitle>
                            {track.name}
                            <ArtistNameWrapper>
                                {track.artists.map((artist, index) => (
                                    <span key={artist + index}>{(index > 0 ? ", " : "") + artist}</span>
                                ))}
                            </ArtistNameWrapper>
                        </ActiveTitle>
                    </ActiveTitleWrapper>
                    <CoverWrapper>
                        <Image
                            src={track.album.images[0]}
                            about={track.name}
                            layout="fill"
                            objectFit="cover"
                            unoptimized
                        />
                        <OpenWrapper>
                            <Open url={track.url} />
                        </OpenWrapper>
                    </CoverWrapper>
                    <PlayerControls />
                </PlayerInner>
            )}
        </PlayerFrame>
    );
};
