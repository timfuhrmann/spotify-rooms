import { createContext, useContext } from "react";

interface CustomThemeContextData {
    theme: string | null;
    toggleTheme: () => void;
}

export const CustomThemeContext = createContext<CustomThemeContextData>({} as CustomThemeContextData);

export const useCustomTheme = () => useContext(CustomThemeContext);
