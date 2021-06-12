import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { PlayIcon } from "../../../icons/PlayIcon";
import { useSpotify } from "../../../context/spotify/SpotifyContext";
import { useData } from "../../../context/websocket/WebsocketContext";
import { PauseIcon } from "../../../icons/PauseIcon";

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

export const Play: React.FC = () => {
    const { player, deviceId, playTrack } = useSpotify();
    const { room } = useData();
    const [paused, setPaused] = useState<boolean>(false);

    useEffect(() => {
        if (!player || !deviceId) {
            return;
        }

        let timeout: NodeJS.Timeout;
        const onStateChanged = (res: Spotify.PlaybackState) => {
            if (!res) {
                return;
            }

            clearTimeout(timeout);

            if (res.track_window?.current_track?.id && res.track_window.current_track.id !== room.active?.id) {
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
    }, [player, deviceId, room.active]);

    const togglePlay = async () => {
        if (!room.active) {
            return;
        }

        if (paused) {
            playTrack(room.active).catch(console.error);
            setPaused(false);
        } else {
            player.pause().catch(console.error);
            setPaused(true);
        }
    };

    return <PlayButton onClick={togglePlay}>{paused ? <PlayButtonIcon /> : <PauseButtonIcon />}</PlayButton>;
};
