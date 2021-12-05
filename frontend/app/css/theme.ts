const theme = {
    //region Color
    black: "#080808",
    white: "#EFEFEF",
    grey: "#7C7C7C",
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
    body: "#D5E7E1",
    text: "#26745c",
    logo: "#26745C",
    primary: "#A1C3D1",
    loading: "#EFEFEF",
    type: "light",
};

export const dark = {
    ...theme,
    body: "#080808",
    text: "#EFEFEF",
    logo: "#EFEFEF",
    primary: "#1DB954",
    loading: "#2C2C2C",
    type: "dark",
};

type Theme = typeof light & typeof dark;

declare module "styled-components" {
    export interface DefaultTheme extends Theme {}
}
