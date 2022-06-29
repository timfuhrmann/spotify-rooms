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
        intrinsic: 0,
        s: 524, // phone
        m: 768, // tablet
        l: 1024, // small laptop
        xl: 1250, // laptop
        xxl: 1440, // desktop
    },
    //endregion

    //region Content Width
    contentWidth: {
        intrinsic: "calc(100vw - 4rem)",
        s: "calc(100vw - 4rem)",
        m: "calc(100vw - 12rem)",
        l: "calc(100vw - 12rem)",
        xl: "calc(100vw - 20rem)",
        xxl: "120rem",
    },
    //endregion
};

type Theme = typeof theme;

declare module "styled-components" {
    export interface DefaultTheme extends Theme {}
}
