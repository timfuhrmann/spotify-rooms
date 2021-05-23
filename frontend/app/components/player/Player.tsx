import React, { useEffect, useState } from "react";
import { ActiveTitle } from "../../css/typography/headlines";
import styled from "styled-components";
import { useSpotify } from "../../context/spotify/SpotifyContext";
import { getTrackById, playTrackAtTime, setVolumeForCurrentTrack } from "../../lib/api/frontend";
import { Volume } from "./controls/Volume";
import { Server } from "../../types/server";

const PlayerFrame = styled.div`
    position: relative;
    width: 40rem;
`;

const PlayerInner = styled.div<{ active: boolean }>`
    opacity: ${p => (p.active ? 1 : 0)};
    transition: opacity 0.3s;
`;

const ActiveTitleWrapper = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    transform: translateY(calc(-100% - 0.5rem));
`;

const ArtistNameWrapper = styled.div`
    display: flex;
`;

const ArtistName = styled(ActiveTitle)`
    opacity: 0.5;
    font-size: 2rem;
`;

const Cover = styled.img`
    display: block;
    width: inherit;
    height: 40rem;
    pointer-events: none;
    user-select: none;
`;

interface PlayerProps {
    room: Server.Room;
}

export const Player: React.FC<PlayerProps> = ({ room }) => {
    const { authToken, setAuthToken, deviceId, player } = useSpotify();
    const [track, setTrack] = useState<Spotify.Track>(null);
    const [muted, setMuted] = useState<boolean>(false);
    const [paused, setPaused] = useState<boolean>(false);

    useEffect(() => {
        if (!authToken || !deviceId || !room) {
            return;
        }

        if (!room.active) {
            player.pause();
            setTrack(null);
            return;
        }

        initNewTrack();
    }, [authToken, deviceId, room]);

    useEffect(() => {
        if (!track) {
            return;
        }

        play();

        const onStateChanged = (res: Spotify.PlaybackState) => {
            if (!res) {
                return;
            }

            setPaused(res.paused);

            if (res.track_window.current_track.id !== track.id) {
                play();
            }
        };

        player.addListener("player_state_changed", onStateChanged);
        return () => {
            player.removeListener("player_state_changed", onStateChanged);
            player.pause();
        };
    }, [track]);

    const initNewTrack = async (): Promise<void> => {
        const res = await getTrackById(authToken, room.active.id, setAuthToken);
        setTrack(res);
    };

    const play = async (): Promise<void> => {
        await playTrackAtTime(authToken, deviceId, track.uri, Date.now() - Date.parse(room.active.date), setAuthToken);
        setPaused(false);
    };

    const toggleMute = async () => {
        if (muted) {
            await setVolumeForCurrentTrack(authToken, deviceId, 100, setAuthToken);
            setMuted(false);
        } else {
            await setVolumeForCurrentTrack(authToken, deviceId, 0, setAuthToken);
            setMuted(true);
        }
    };

    return (
        <PlayerFrame>
            <PlayerInner active={!!track}>
                <ActiveTitleWrapper>
                    <ActiveTitle>{track?.name}</ActiveTitle>
                    <ArtistNameWrapper>
                        {track?.artists.map((artist, index) => (
                            <ArtistName key={artist.name + index}>{(index > 0 ? ", " : "") + artist.name}</ArtistName>
                        ))}
                    </ArtistNameWrapper>
                </ActiveTitleWrapper>
                <Cover
                    src={track?.album.images[0].url}
                    width={track?.album.images[0].width}
                    height={track?.album.images[0].height}
                />
                {paused && <button onClick={play}>Play</button>}
                <Volume onClick={toggleMute} />
            </PlayerInner>
        </PlayerFrame>
    );
};
