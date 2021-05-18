import React from "react";
import { AppProps } from "next/app";
import { SpotifyProvider } from "../app/context/spotify/SpotifyProvider";
import { ThemeProvider } from "styled-components";
import { light, dark } from "../app/css/theme";
import { GlobalStyle } from "../app/css/GlobalStyle";
import { Navigation } from "../app/components/navigation/Navigation";
import { WebsocketProvider } from "../app/context/websocket/WebsocketProvider";

const App: React.FC<AppProps> = ({ Component, pageProps }) => {
    return (
        <WebsocketProvider>
            <SpotifyProvider authToken={pageProps.authToken}>
                <ThemeProvider theme={dark}>
                    <GlobalStyle />
                    <Navigation />
                    <Component {...pageProps} />
                </ThemeProvider>
            </SpotifyProvider>
        </WebsocketProvider>
    );
};

export default App;
