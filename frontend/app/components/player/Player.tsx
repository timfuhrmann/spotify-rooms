import React, { useEffect, useState } from "react";
import { ActiveTitle } from "../../css/typography/headlines";
import styled from "styled-components";
import { useSpotify } from "../../context/spotify/SpotifyContext";
import { getTrackById, playTrackAtTime, setVolumeForCurrentTrack } from "../../lib/api/frontend";
import { Volume } from "./controls/Volume";
import { Api } from "../../types/api";
import { Server } from "../../types/server";

const PlayerFrame = styled.div`
    position: relative;
    width: 40rem;
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

const Info = styled.div`
    text-align: center;
`;

interface PlayerProps {
    room: Server.Room;
}

export const Player: React.FC<PlayerProps> = ({ room }) => {
    const { authToken, deviceId, player } = useSpotify();
    const [track, setTrack] = useState<Api.SpotifyTrack>(null);
    const [muted, setMuted] = useState<boolean>(false);
    const [paused, setPaused] = useState<boolean>(false);

    useEffect(() => {
        console.log(room);
    }, [room]);

    useEffect(() => {
        if (!authToken || !deviceId || !room) {
            return;
        }

        if (!room.activeTrack) {
            player.pause();
            setTrack(null);
            return;
        }

        getTrackById(authToken, room.activeTrack.id).then(res => {
            setTrack(res);
        });
    }, [authToken, deviceId, room]);

    useEffect(() => {
        if (!track) {
            return;
        }

        playTrackAtTime(authToken, deviceId, track.uri, Date.now() - room.activeTrack.date).then(() => {
            setPaused(false);
        });

        const onStateChanged = (res: Spotify.PlaybackState) => {
            if (!res) {
                return;
            }

            if (res.track_window.current_track.id !== track.id) {
                playTrackAtTime(authToken, deviceId, track.uri, Date.now() - room.activeTrack.date);
            }

            if (res.paused && res.position !== res.duration) {
                // it seems you're trying to pause from another device
                setPaused(true);
                player.togglePlay();
            } else {
                setPaused(false);
            }
        };

        player.addListener("player_state_changed", onStateChanged);
        return () => {
            player.removeListener("player_state_changed", onStateChanged);
            player.pause();
        };
    }, [track]);

    const toggleMute = async () => {
        if (muted) {
            await setVolumeForCurrentTrack(authToken, deviceId, 100);
            setMuted(false);
        } else {
            await setVolumeForCurrentTrack(authToken, deviceId, 0);
            setMuted(true);
        }
    };

    const resume = async () => {
        playTrackAtTime(authToken, deviceId, track.uri, Date.now() - room.activeTrack.date).then(() => {
            setPaused(false);
        });
    };

    return (
        <PlayerFrame>
            {track ? (
                <>
                    <ActiveTitleWrapper>
                        <ActiveTitle>{track.name}</ActiveTitle>
                        <ArtistNameWrapper>
                            {track.artists.map((artist, index) => (
                                <ArtistName key={artist.name + index}>
                                    {(index > 0 ? ", " : "") + artist.name}
                                </ArtistName>
                            ))}
                        </ArtistNameWrapper>
                    </ActiveTitleWrapper>
                    <Cover
                        src={track.album.images[0].url}
                        width={track.album.images[0].width}
                        height={track.album.images[0].height}
                    />
                    {paused && <button onClick={resume}>Play</button>}
                    <Volume onClick={toggleMute} />
                </>
            ) : (
                <Info>Search for your favourite music to listen to some tunes.</Info>
            )}
        </PlayerFrame>
    );
};
