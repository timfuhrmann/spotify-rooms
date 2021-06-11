import React from "react";
import styled from "styled-components";

const SpinnerFrame = styled.div`
    position: relative;
    width: 1rem;
    height: 1rem;
    border-radius: 0.5rem;
    margin: 2rem auto 0;
    background-color: ${p => p.theme.primary};
    color: ${p => p.theme.primary};
    transform: scale(1.25, 1.25);
    animation: dotStretching 1.5s infinite ease-in;

    &::before,
    &::after {
        content: "";
        display: inline-block;
        position: absolute;
        top: 0;
    }

    &::before {
        width: 1rem;
        height: 1rem;
        border-radius: 0.5rem;
        background-color: ${p => p.theme.primary};
        color: ${p => p.theme.primary};
        animation: dotStretchingBefore 1.5s infinite ease-in;
    }

    &::after {
        width: 1rem;
        height: 1rem;
        border-radius: 0.5rem;
        background-color: ${p => p.theme.primary};
        color: ${p => p.theme.primary};
        animation: dotStretchingAfter 1.5s infinite ease-in;
    }

    @keyframes dotStretching {
        0% {
            transform: scale(1.25, 1.25);
        }
        50%,
        60% {
            transform: scale(0.8, 0.8);
        }
        100% {
            transform: scale(1.25, 1.25);
        }
    }

    @keyframes dotStretchingBefore {
        0% {
            transform: translate(0) scale(0.7, 0.7);
        }
        50%,
        60% {
            transform: translate(-20px) scale(1, 1);
        }
        100% {
            transform: translate(0) scale(0.7, 0.7);
        }
    }

    @keyframes dotStretchingAfter {
        0% {
            transform: translate(0) scale(0.7, 0.7);
        }
        50%,
        60% {
            transform: translate(20px) scale(1, 1);
        }
        100% {
            transform: translate(0) scale(0.7, 0.7);
        }
    }
`;

export const Spinner: React.FC = () => {
    return <SpinnerFrame />;
};
