import React from "react";
import styled from "styled-components";

const SpinnerFrame = styled.div`
    display: block;
    position: relative;
    width: 6rem;
    height: 6rem;
    margin: 5rem auto;
    opacity: 0.5;
`;

const SpinnerItem = styled.div`
    box-sizing: border-box;
    display: block;
    position: absolute;
    width: 4.4rem;
    height: 4.4rem;
    margin: 0.8rem;
    animation: ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
    border: 0.4rem solid ${p => p.theme.text};
    border-color: ${p => p.theme.text} transparent transparent transparent;
    border-radius: 50%;

    &:nth-child(1) {
        animation-delay: -0.45s;
    }

    &:nth-child(2) {
        animation-delay: -0.3s;
    }

    &:nth-child(3) {
        animation-delay: -0.15s;
    }

    @keyframes ring {
        0% {
            transform: rotate(0deg);
        }
        100% {
            transform: rotate(360deg);
        }
    }
`;

export const Spinner: React.FC = () => {
    return (
        <SpinnerFrame>
            <SpinnerItem />
            <SpinnerItem />
            <SpinnerItem />
            <SpinnerItem />
        </SpinnerFrame>
    );
};
