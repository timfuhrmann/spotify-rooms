import React from "react";
import { AppProps } from "next/app";
import { SpotifyProvider } from "../app/context/spotify/SpotifyProvider";
import { Navigation } from "../app/components/navigation/Navigation";
import { WebsocketProvider } from "../app/context/websocket/WebsocketProvider";
import { CustomThemeProvider } from "../app/context/theme/CustomThemeProvider";

const App: React.FC<AppProps> = ({ Component, pageProps }) => {
    return (
        <WebsocketProvider>
            <SpotifyProvider token={pageProps.authToken}>
                <CustomThemeProvider>
                    <Navigation />
                    <Component {...pageProps} />
                </CustomThemeProvider>
            </SpotifyProvider>
        </WebsocketProvider>
    );
};

export default App;
