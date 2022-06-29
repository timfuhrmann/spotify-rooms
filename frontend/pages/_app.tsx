import React from "react";
import "@css/fonts/stylesheet.css";
import { AppProps } from "next/app";
import { Navigation } from "../app/components/navigation/Navigation";
import { SpotifyProvider } from "@lib/context/spotify/SpotifyProvider";
import { WebsocketProvider } from "@lib/context/websocket/WebsocketProvider";
import { CustomThemeProvider } from "@lib/context/theme/CustomThemeProvider";
import { SessionProvider } from "@lib/context/session/SessionProvider";

const App: React.FC<AppProps> = ({ Component, pageProps }) => {
    return (
        <SessionProvider>
            <WebsocketProvider>
                <SpotifyProvider>
                    <CustomThemeProvider>
                        {!pageProps.hideNav && <Navigation />}
                        <Component {...pageProps} />
                    </CustomThemeProvider>
                </SpotifyProvider>
            </WebsocketProvider>
        </SessionProvider>
    );
};

export default App;
