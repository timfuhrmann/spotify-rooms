import React, { PropsWithChildren, useEffect, useState } from "react";
import Head from "next/head";
import { ThemeProvider as SCThemeProvider } from "styled-components";
import { CustomThemeContext } from "./index";
import { theme as styles } from "@css/theme";
import { GlobalStyle } from "@css/GlobalStyle";

const STORAGE_THEME = "spotify-rooms-theme";

export const CustomThemeProvider: React.FC<PropsWithChildren> = ({ children }) => {
    const [theme, setTheme] = useState<string | null>(null);

    useEffect(() => {
        const value = localStorage.getItem(STORAGE_THEME);

        if (value === "light") {
            setTheme("light");
        } else {
            setTheme("dark");
        }
    }, []);

    useEffect(() => {
        if (!theme) {
            return;
        }

        const d = document.documentElement.classList;

        if (theme === "light") {
            d.add("light-theme");
        } else {
            d.remove("light-theme");
        }

        localStorage.setItem(STORAGE_THEME, theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme(prevState => (prevState === "dark" ? "light" : "dark"));
    };

    return (
        <CustomThemeContext.Provider value={{ theme, toggleTheme }}>
            <Head>
                <script
                    key="color-theme"
                    dangerouslySetInnerHTML={{
                        __html: `(function(){try{var d=document.documentElement.classList;d.remove('light-theme');var e=localStorage.getItem('becklyn-theme');if(e==='light'){d.add('light-theme');}}catch(e){}})()`,
                    }}
                />
            </Head>
            <SCThemeProvider theme={styles}>
                <GlobalStyle />
                {children}
            </SCThemeProvider>
        </CustomThemeContext.Provider>
    );
};
