import React from "react";
import styled from "styled-components";
import { SkipForward } from "../../../icons/SkipForward";

const Info = styled.div`
    position: absolute;
    z-index: 1;
    bottom: 50%;
    right: 0;
    transform: translate(calc(100% + 2rem), 50%);
    padding: 2rem;
    width: 30rem;
    background-color: ${p => p.theme.white};
    color: ${p => p.theme.black};
    pointer-events: none;
    opacity: 0;
    transition: opacity 0.1s;
    will-change: opacity;
`;

const SkipButton = styled.button<{ active: boolean }>`
    position: relative;
    display: block;
    color: ${p => p.active && p.theme.green};

    @media (hover: hover) {
        &:hover {
            ${Info} {
                opacity: 1;
            }
        }
    }
`;

const SkipValue = styled.div`
    font-weight: bold;
    margin-top: 1rem;
`;

const SkipIcon = styled(SkipForward)`
    width: 2.1rem;
    height: 2.1rem;
`;

interface SkipProps {
    active: boolean;
    overlineValue: number;
    onClick: () => void;
}

export const Skip: React.FC<SkipProps> = ({ overlineValue, active, onClick }) => {
    return (
        <SkipButton onClick={onClick} active={active}>
            <SkipIcon />
            <Info>
                You don't like what you're hearing? Vote to skip!
                <SkipValue>
                    {overlineValue} {overlineValue !== 1 ? "votes" : "vote"} received
                </SkipValue>
            </Info>
        </SkipButton>
    );
};
