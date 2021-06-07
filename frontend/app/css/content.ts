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

export const transition = css`
    opacity: 0;
    animation: opener 2s ease 0.3s forwards;
    will-change: opacity;

    @keyframes opener {
        100% {
            opacity: 1;
        }
    }
`;
