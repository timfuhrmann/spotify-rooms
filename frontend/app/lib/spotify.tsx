import React, { useEffect } from "react";
import Script from "next/script";
import { useSpotify } from "./context/spotify";

export const SpotifyWebPlayer: React.FC = () => {
    const { authToken, player, setPlayer, setDeviceId, refreshAccessToken } = useSpotify();

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

        player.addListener("authentication_error", refreshAccessToken);
        player.addListener("ready", ({ device_id }) => {
            setDeviceId(device_id);
        });

        player.connect();

        return () => {
            player.removeListener("authentication_error");
            player.removeListener("ready");
            player.disconnect();
        };
    }, [player]);

    const initSpotifyPlayer = () => {
        const spotifyPlayer = new Spotify.Player({
            name: "Spotify Rooms",
            getOAuthToken: cb => {
                if (!authToken) {
                    return;
                }

                cb(authToken);
            },
        });

        setPlayer(spotifyPlayer);
    };

    return <Script id="spotify-player" src="https://sdk.scdn.co/spotify-player.js" strategy="afterInteractive" />;
};
