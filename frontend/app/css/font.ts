import { css } from "styled-components";

export const font = css`
    @font-face {
        font-family: "Circular Std Book";
        src: url("/fonts/CircularStd-Book.woff2") format("woff2"),
            url("/fonts/CircularStd-Book.woff") format("woff");
        font-weight: normal;
        font-style: normal;
        font-display: swap;
    }

    @font-face {
        font-family: "Circular Std";
        src: url("/fonts/CircularStd-Medium.woff2") format("woff2"),
            url("/fonts/CircularStd-Medium.woff") format("woff");
        font-weight: 500;
        font-style: normal;
        font-display: swap;
    }

    @font-face {
        font-family: "Circular Std";
        src: url("/fonts/CircularStd-Bold.woff2") format("woff2"),
            url("/fonts/CircularStd-Bold.woff") format("woff");
        font-weight: bold;
        font-style: normal;
        font-display: swap;
    }

    @font-face {
        font-family: "Circular Std";
        src: url("/fonts/CircularStd-Light.woff2") format("woff2"),
            url("/fonts/CircularStd-Light.woff") format("woff");
        font-weight: 300;
        font-style: normal;
        font-display: swap;
    }

    @font-face {
        font-family: "Circular Std";
        src: url("/fonts/CircularStd-Black.woff2") format("woff2"),
            url("/fonts/CircularStd-Black.woff") format("woff");
        font-weight: 900;
        font-style: normal;
        font-display: swap;
    }
`;
