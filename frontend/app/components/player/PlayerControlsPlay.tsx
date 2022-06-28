import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { PlayIcon } from "@icons/PlayIcon";
import { useSpotify } from "@lib/context/spotify";
import { PauseIcon } from "@icons/PauseIcon";
import { usePlayer } from "./PlayerProvider";

const PlayButton = styled.button`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 4rem;
    height: 4rem;
    border-radius: 50%;
    background-color: ${p => p.theme.white};
    color: ${p => p.theme.black};
    transition: background-color 0.2s;

    @media (hover: hover) {
        &:hover {
            background-color: ${p => p.theme.primary};
        }
    }
`;

const PlayButtonIcon = styled(PlayIcon)`
    width: 2rem;
    height: 2rem;
    margin-left: 0.5rem;
`;

const PauseButtonIcon = styled(PauseIcon)`
    width: 2rem;
    height: 2rem;
`;

export const PlayerControlsPlay: React.FC = () => {
    const { track } = usePlayer();
    const { player, deviceId, playTrack } = useSpotify();
    const [paused, setPaused] = useState<boolean>(false);

    useEffect(() => {
        if (!player || !deviceId) {
            return;
        }

        let timeout: NodeJS.Timeout;

        const onStateChanged = (res: Spotify.PlaybackState) => {
            if (!track) {
                return;
            }

            clearTimeout(timeout);

            if (res.track_window?.current_track?.id && res.track_window.current_track.id !== track?.id) {
                timeout = setTimeout(() => {
                    setPaused(true);
                }, 2000);
            } else {
                timeout = setTimeout(() => {
                    setPaused(res.paused);
                }, 2000);
            }
        };

        player.addListener("player_state_changed", onStateChanged);
        return () => {
            player.removeListener("player_state_changed", onStateChanged);
            clearTimeout(timeout);
        };
    }, [player, deviceId, track]);

    const togglePlay = async () => {
        if (!player || !track) {
            return;
        }

        if (paused) {
            playTrack(track);
            setPaused(false);
        } else {
            player.pause();
            setPaused(true);
        }
    };

    return <PlayButton onClick={togglePlay}>{paused ? <PlayButtonIcon /> : <PauseButtonIcon />}</PlayButton>;
};
