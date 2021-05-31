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
    const [theme, setTheme] = useState<Theme | null>(null);

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
        setTheme(prevState => ("light" === prevState ? "dark" : "light"));
    };

    return (
        <CustomThemeContext.Provider value={{ toggleTheme }}>
            <ThemeProvider theme={"light" === theme ? light : dark}>
                <GlobalStyle />
                {children}
            </ThemeProvider>
        </CustomThemeContext.Provider>
    );
};

export const useCustomTheme = () => useContext(CustomThemeContext);
