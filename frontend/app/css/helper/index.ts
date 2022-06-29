import { css } from "styled-components";

export const aspectRatio = (value: number) => css`
    &::after {
        content: "";
        display: block;
        padding-bottom: ${100 * value}%;
    }
`;

export const square = (value: string) => css`
    height: ${value};
    width: ${value};
`;

export const fillParent = css`
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
`;

export const centerAbsolute = css`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translateX(-50%) translateY(-50%);
`;

export const transition = (
    properties: string,
    durations: string,
    timingFunctions: string = "ease",
    delays: string = "0s"
) => css`
    transition-property: ${properties.split(" ").join(",")};
    transition-duration: ${durations.split(" ").join(",")};
    transition-timing-function: ${timingFunctions.split(" ").join(",")};
    transition-delay: ${delays.split(" ").join(",")};
    will-change: ${properties.split(" ").join(",")};

    @media screen and (prefers-reduced-motion: reduce) {
        transition: none;
    }
`;

export const hover = (literals: TemplateStringsArray, ...placeholders: any[]) => css`
    @media (hover: hover) {
        &:hover {
            ${css(literals, ...placeholders)};
        }
    }
`;
