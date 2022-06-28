import styled, { css } from "styled-components";

export const Content = styled.div<{ breakOnMobile?: boolean }>`
    margin: 0 2rem;
    width: calc(100% - 4rem);

    @media ${p => p.theme.bp.l} {
        max-width: 120rem;
        width: calc(100% - 20rem);
        margin: 0 auto;
    }
`;

export const aspectRatio = (value: number) => `
    &::after {
        content: "";
        display: block;
        padding-bottom: ${100 * value}%;
    }
`;

export const square = (size: string) => css`
    width: ${size};
    height: ${size};
`;

export const fillParent = css`
    position: absolute;
    top: 0;
    left: 0;
    ${square("100%")};
`;

export const centerAbsolute = css`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
`;

export const transition = (
    properties: string,
    durations: string,
    timingFunctions: string | number[] = "ease",
    delays: string = "0s"
) => css`
    will-change: ${properties};
    transition-property: ${properties};
    transition-duration: ${durations};
    transition-delay: ${delays};
    transition-timing-function: ${typeof timingFunctions === "string"
        ? timingFunctions
        : `cubic-bezier(${timingFunctions.join(",")})`};

    @media (prefers-reduced-motion: reduce) {
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
