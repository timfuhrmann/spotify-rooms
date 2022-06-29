import styled from "styled-components";
import { breakpoints } from "@css/helper/breakpoints";

export const Headline = styled.h1`
    font-weight: 900;
    font-size: 5rem;
    letter-spacing: -0.2rem;

    ${breakpoints().min("l")} {
        font-size: 8rem;
    }
`;

export const SecondaryHeadline = styled.h2`
    font-weight: bold;
    font-size: 4rem;
    letter-spacing: -0.2rem;

    ${breakpoints().min("l")} {
        font-size: 5.5rem;
    }
`;

export const TertiaryHeadline = styled.h3`
    font-weight: 300;
    font-size: 3rem;
    letter-spacing: -0.1rem;

    ${breakpoints().min("l")} {
        font-size: 4.5rem;
    }
`;

export const ActiveTitle = styled.h4`
    font-weight: bold;
    font-size: 3.5rem;
    letter-spacing: -0.1rem;
`;
