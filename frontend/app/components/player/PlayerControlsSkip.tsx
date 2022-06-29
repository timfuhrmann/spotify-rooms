import React, { useRef, useState } from "react";
import styled from "styled-components";
import { SkipForward } from "@icons/SkipForward";
import { breakpoints } from "@css/helper/breakpoints";

const Info = styled.div<{ visible: boolean }>`
    position: fixed;
    z-index: 3;
    bottom: 3rem;
    left: 2rem;
    display: none;
    padding: 2rem;
    width: 30rem;
    background-color: ${p => p.theme.white};
    color: ${p => p.theme.black};
    pointer-events: none;
    opacity: ${p => (p.visible ? 1 : 0)};
    transition: opacity 0.1s;
    will-change: opacity;

    ${breakpoints().min("l")} {
        display: block;
    }
`;

const SkipButton = styled.button<{ active: boolean }>`
    position: relative;
    display: flex;
    color: ${p => p.active && p.theme.primary};
    opacity: 0.6;
    transition: opacity 0.2s;

    @media (hover: hover) {
        &:hover {
            opacity: 1;
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

interface PlayerControlsSkipProps {
    active: boolean;
    overlineValue: number;
    onClick: () => void;
}

export const PlayerControlsSkip: React.FC<PlayerControlsSkipProps> = ({ overlineValue, active, onClick }) => {
    const timeout = useRef<NodeJS.Timeout | null>(null);
    const [infoVisible, setInfoVisible] = useState<boolean>(false);

    return (
        <React.Fragment>
            <SkipButton
                onClick={onClick}
                active={active}
                onMouseEnter={() => {
                    setInfoVisible(true);

                    if (timeout.current) {
                        clearTimeout(timeout.current);
                    }
                }}
                onMouseLeave={() => {
                    timeout.current = setTimeout(() => {
                        setInfoVisible(false);
                    }, 500);
                }}>
                <SkipIcon />
            </SkipButton>
            <Info visible={infoVisible}>
                You don&apos;t like what you&apos;re hearing? Vote to skip!
                <SkipValue>
                    {overlineValue} {overlineValue !== 1 ? "votes" : "vote"} received
                </SkipValue>
            </Info>
        </React.Fragment>
    );
};
