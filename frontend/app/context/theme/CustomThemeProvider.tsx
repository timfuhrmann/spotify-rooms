import React, { createContext, useContext, useEffect, useState } from "react";
import { ThemeProvider } from "styled-components";
import { dark, light } from "../../css/theme";
import { GlobalStyle } from "../../css/GlobalStyle";

type Theme = "dark" | "light" | null;

interface CustomThemeContextData {
    theme: Theme;
    toggleTheme: () => void;
}

const CustomThemeContext = createContext<CustomThemeContextData>({} as CustomThemeContextData);

const STORAGE_THEME = "spotify-rooms-theme";

export const CustomThemeProvider: React.FC = ({ children }) => {
    const [theme, setTheme] = useState<Theme>(null);

    useEffect(() => {
        const val = localStorage.getItem(STORAGE_THEME);

        if ("light" === val || "dark" === val) {
            setTheme(val);
        }
    }, []);

    useEffect(() => {
        if (!theme) {
            return;
        }

        localStorage.setItem(STORAGE_THEME, theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme(prevState => ("dark" === prevState ? "light" : "dark"));
    };

    return (
        <CustomThemeContext.Provider value={{ theme, toggleTheme }}>
            <ThemeProvider theme={"dark" === theme ? dark : light}>
                <GlobalStyle />
                {children}
            </ThemeProvider>
        </CustomThemeContext.Provider>
    );
};

export const useCustomTheme = () => useContext(CustomThemeContext);
