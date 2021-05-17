import React, { useEffect, useState } from "react";
import Head from "next/head";
import { useSpotify } from "./SpotifyContext";

interface SpotifyInitProps {
    authToken: string;
}

export const SpotifyInit: React.FC<SpotifyInitProps> = ({ authToken }) => {
    const { setDeviceId, setPlayer } = useSpotify();
    const [currentTrackName, setCurrentTrackName] = useState<string>("");

    useEffect(() => {
        let playerRef: Spotify.Player;

        window.onSpotifyWebPlaybackSDKReady = () => {
            playerRef = new Spotify.Player({
                name: "Spotify Rooms",
                getOAuthToken: cb => {
                    cb(authToken);
                },
            });

            // Error handling
            playerRef.addListener("initialization_error", ({ message }) => {
                console.error(message);
            });
            playerRef.addListener("authentication_error", ({ message }) => {
                console.error(message);
            });
            playerRef.addListener("account_error", ({ message }) => {
                console.error(message);
            });
            playerRef.addListener("playback_error", ({ message }) => {
                console.error(message);
            });

            // Playback status updates
            playerRef.addListener("player_state_changed", state => {
                console.log(state);
                if (state?.track_window) {
                    setCurrentTrackName(state.track_window.current_track.name);
                }
            });

            // Ready
            playerRef.addListener("ready", ({ device_id }) => {
                console.log("Ready with Device ID", device_id);
                setDeviceId(device_id);
            });

            // Not Ready
            playerRef.addListener("not_ready", ({ device_id }) => {
                console.log("Device ID has gone offline", device_id);
            });

            // Connect to the player!
            playerRef.connect().then(success => {
                if (success) {
                    console.log("The Web Playback SDK successfully connected to Spotify!");
                    setPlayer(playerRef);
                }
            });
        };

        return () => {
            if (playerRef) {
                playerRef.disconnect();
            }
        };
    }, []);

    return (
        <Head>
            {currentTrackName && <title>{currentTrackName}</title>}
            <script src="https://sdk.scdn.co/spotify-player.js" />
        </Head>
    );
};
