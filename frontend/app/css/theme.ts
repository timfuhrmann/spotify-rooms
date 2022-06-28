export const theme = {
    //region Color
    black: "#080808",
    white: "#EFEFEF",
    grey: "#7C7C7C",

    body: "var(--color-body)",
    text: "var(--color-text)",
    logo: "var(--color-logo)",
    primary: "var(--color-primary)",
    loading: "var(--color-loading)",

    gray50: "var(--color-gray50)",
    gray75: "var(--color-gray75)",
    gray100: "var(--color-gray100)",
    gray200: "var(--color-gray200)",
    gray300: "var(--color-gray300)",
    gray400: "var(--color-gray400)",
    gray500: "var(--color-gray500)",
    gray600: "var(--color-gray600)",
    gray700: "var(--color-gray700)",
    gray800: "var(--color-gray800)",
    gray900: "var(--color-gray900)",
    //endregion Color

    //region Border
    radius: "0.5rem",
    borderColor: "rgba(255, 255, 255, 0.5)",
    //endregion

    //region Breakpoints
    bp: {
        m: "screen and (min-width: 768px)",
        l: "screen and (min-width: 1024px)",
        xl: "screen and (min-width: 1340px)",
        xxl: "screen and (min-width: 2000px)",
    },
    //endregion
};

type Theme = typeof theme;

declare module "styled-components" {
    export interface DefaultTheme extends Theme {}
}
