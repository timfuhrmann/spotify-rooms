const theme = {
    //region Color
    black: "#191414",
    white: "#fff",
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

export const light = {
    ...theme,
    body: "#d5e7e1",
    text: "#26745c",
    logo: "#26745c",
    primary: "#a1c3d1",
    type: "light",
};

export const dark = {
    ...theme,
    body: "#191414",
    text: "#fff",
    logo: "#fff",
    primary: "#1db954",
    type: "dark",
};

type Theme = typeof light & typeof dark;

declare module "styled-components" {
    export interface DefaultTheme extends Theme {}
}
