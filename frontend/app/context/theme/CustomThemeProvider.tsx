import React, { createContext, useContext, useEffect, useState } from "react";
import { ThemeProvider } from "styled-components";
import { dark, light } from "../../css/theme";
import { GlobalStyle } from "../../css/GlobalStyle";

interface CustomThemeContextData {
    toggleTheme: () => void;
}

const CustomThemeContext = createContext<CustomThemeContextData>({} as CustomThemeContextData);

type Theme = "dark" | "light";

const STORAGE_THEME = "spotify-rooms-theme";

export const CustomThemeProvider: React.FC = ({ children }) => {
    const [theme, setTheme] = useState<Theme>("dark");

    useEffect(() => {
        const val = localStorage.getItem(STORAGE_THEME) as Theme;
        setTheme(val);
    }, []);

    useEffect(() => {
        localStorage.setItem(STORAGE_THEME, theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme(prevState => ("dark" === prevState ? "light" : "dark"));
    };

    return (
        <CustomThemeContext.Provider value={{ toggleTheme }}>
            <ThemeProvider theme={"dark" === theme ? dark : light}>
                <GlobalStyle />
                {children}
            </ThemeProvider>
        </CustomThemeContext.Provider>
    );
};

export const useCustomTheme = () => useContext(CustomThemeContext);
