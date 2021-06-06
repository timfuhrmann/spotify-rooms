import styled from "styled-components";

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
