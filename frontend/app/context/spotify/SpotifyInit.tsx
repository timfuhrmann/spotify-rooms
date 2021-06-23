import React, { useEffect } from "react";
import Script from "next/script";
import { useSpotify } from "./SpotifyContext";
import { clientRequestRefresh } from "../../lib/api/auth";

interface SpotifyInitProps {
    authToken: string;
}

export const SpotifyInit: React.FC<SpotifyInitProps> = ({ authToken }) => {
    const { player, setPlayer, setDeviceId, setAuthToken } = useSpotify();

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
            clientRequestRefresh().then(setAuthToken);
            console.error(message);
        });

        player.addListener("account_error", ({ message }) => {
            console.error(message);
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

    return <Script src="https://sdk.scdn.co/spotify-player.js" strategy="afterInteractive" />;
};
