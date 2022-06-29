import React, { useEffect } from "react";
import Script from "next/script";
import { useSpotify } from "./context/spotify";
import { useSession } from "@lib/context/session";

export const SpotifyWebPlayer: React.FC = () => {
    const { authToken, refreshAuthToken } = useSession();
    const { player, setPlayer, setDeviceId } = useSpotify();

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

        player.addListener("authentication_error", refreshAuthToken);
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
