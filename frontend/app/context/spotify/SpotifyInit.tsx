import React, { useEffect, useState } from "react";
import Head from "next/head";
import { useSpotify } from "./SpotifyContext";
import { refreshToken } from "../../lib/api/auth";

interface SpotifyInitProps {
    authToken: string;
}

export const SpotifyInit: React.FC<SpotifyInitProps> = ({ authToken }) => {
    const { setDeviceId, player, setPlayer, setAuthToken } = useSpotify();
    const [currentTrackName, setCurrentTrackName] = useState<string>("");

    useEffect(() => {
        if (!authToken) {
            return;
        }

        try {
            initSpotifyPlayer();
        } catch (e) {
            window.onSpotifyWebPlaybackSDKReady = () => {
                initSpotifyPlayer();
            };
        }
    }, [authToken]);

    useEffect(() => {
        if (!player) {
            return;
        }

        player.addListener("initialization_error", ({ message }) => {
            console.error(message);
        });

        player.addListener("authentication_error", ({ message }) => {
            refreshToken().then(setAuthToken);
            console.error(message);
        });

        player.addListener("account_error", ({ message }) => {
            console.error(message);
        });

        player.addListener("player_state_changed", state => {
            if (state?.track_window) {
                setCurrentTrackName(state.track_window.current_track.name);
            }
        });

        player.addListener("ready", ({ device_id }) => {
            console.log("Ready with Device ID", device_id);
            setDeviceId(device_id);
        });

        player.connect().then(success => {
            if (success) {
                console.log("The Web Playback SDK successfully connected to Spotify!");
            }
        });

        return () => {
            player.removeListener("initialization_error");
            player.removeListener("authentication_error");
            player.removeListener("account_error");
            player.removeListener("player_state_changed");
            player.removeListener("ready");
            player.disconnect();
        };
    }, [player]);

    const initSpotifyPlayer = () => {
        const playerRef = new Spotify.Player({
            name: "Spotify Rooms",
            getOAuthToken: cb => {
                cb(authToken);
            },
        });
        setPlayer(playerRef);
    };

    return (
        <Head>
            {currentTrackName && <title>{currentTrackName}</title>}
            <script src="https://sdk.scdn.co/spotify-player.js" />
        </Head>
    );
};
