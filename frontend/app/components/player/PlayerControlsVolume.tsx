import React, { useEffect, useState } from "react";
import styled, { css } from "styled-components";
import { Mute } from "@icons/Mute";
import { Sound } from "@icons/Sound";
import { useSpotify } from "@lib/context/spotify";
import { hover, square, transition } from "@css/helper";

const VolumeButton = styled.div`
    display: flex;
    align-items: center;
`;

const ProgressBar = styled.div`
    position: relative;
    width: 10rem;
    height: 0.5rem;
    border-radius: 0.25rem;
    background-color: ${p => p.theme.grey};
    overflow: hidden;
    transform: translateZ(0);
`;

const ProgressBarInner = styled.div.attrs<{ width: number }>(p => ({ style: { width: `${p.width}%` } }))<{
    width: number;
}>`
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    background-color: ${p => p.theme.white};
    ${transition("background-color", "0.1s")};
    will-change: width, background-color;
`;

const ProgressBarKnob = styled.div.attrs<{ pos: number }>(p => ({
    style: { transform: `translate3d(calc(${p.pos}px - 50%), -50%, 0)` },
}))<{ pos: number }>`
    position: absolute;
    top: 50%;
    left: 0;
    ${square("1.25rem")};
    border-radius: 50%;
    background-color: ${p => p.theme.white};
    will-change: transform, opacity;

    @media (hover: hover) {
        opacity: 0;
    }
`;

const IconWrapper = styled.button`
    display: flex;
    margin-right: 0.75rem;
    opacity: 0.6;
    transition: opacity 0.2s;

    ${hover`
        opacity: 1;
    `}
`;

const MuteIcon = styled(Mute)`
    ${square("2.4rem")};
`;

const SoundIcon = styled(Sound)`
    ${square("2.4rem")};
`;

const progressActive = css`
    ${ProgressBarKnob} {
        opacity: 1;
    }

    ${ProgressBarInner} {
        background-color: ${p => p.theme.primary};
    }
`;

const ProgressBarWrapper = styled.div<{ active: boolean }>`
    position: relative;
    ${p => p.active && progressActive};

    @media (hover: hover) {
        &:hover {
            ${progressActive};
        }
    }
`;

interface VolumeStart {
    startVolume: number;
    startX: number;
}

export const PlayerControlsVolume: React.FC = () => {
    const { player } = useSpotify();
    const [muted, setMuted] = useState<boolean>(false);
    const [start, setStart] = useState<VolumeStart | null>(null);
    const [dragging, setDragging] = useState<boolean>(false);
    const [volume, setVolume] = useState<number>(100);

    useEffect(() => {
        document.addEventListener("mouseup", onDragEnd);
        document.addEventListener("mousemove", onMouseMove);
        document.addEventListener("touchend", onDragEnd);
        document.addEventListener("touchcancel", onDragEnd);
        document.addEventListener("touchmove", onTouchMove);

        return () => {
            document.removeEventListener("mouseup", onDragEnd);
            document.removeEventListener("mousemove", onMouseMove);
            document.removeEventListener("touchend", onDragEnd);
            document.removeEventListener("touchcancel", onDragEnd);
            document.removeEventListener("touchmove", onTouchMove);
        };
    }, [dragging, start]);

    useEffect(() => {
        if (!player) {
            return;
        }

        player.getVolume().then(vol => {
            setVolume(vol * 100);
        });
    }, [player]);

    useEffect(() => {
        if (!player) {
            return;
        }

        player.setVolume(volume / 100);
    }, [player, volume]);

    const toggleMute = async () => {
        if (!player) {
            return;
        }

        if (muted) {
            await player.setVolume(volume / 100);
            setMuted(false);
        } else {
            await player.setVolume(0);
            setMuted(true);
        }
    };

    const onMouseDown = async (event: React.MouseEvent) => {
        if (!player) {
            return;
        }

        if (muted) {
            await player.setVolume(volume / 100);
            setMuted(false);
        }

        setDragging(true);
        setStart({
            startVolume: volume,
            startX: event.clientX,
        });
    };

    const onTouchStart = async (event: React.TouchEvent) => {
        if (!player) {
            return;
        }

        if (muted) {
            await player.setVolume(volume / 100);
            setMuted(false);
        }

        setDragging(true);
        setStart({
            startVolume: volume,
            startX: event.touches[0].clientX,
        });
    };

    const onDragEnd = () => {
        if (!dragging) {
            return;
        }

        setStart(null);
        setDragging(false);
    };

    const onMouseMove = (event: MouseEvent) => {
        if (!dragging) {
            return;
        }

        calcVolume(event.clientX);
    };

    const onTouchMove = (event: TouchEvent) => {
        if (!dragging) {
            return;
        }

        calcVolume(event.touches[0].clientX);
    };

    const calcVolume = (x: number) => {
        if (!start) {
            return;
        }

        const drag = start.startX - x;
        const val = Math.max(1, Math.min(100, start.startVolume - drag));
        setVolume(val);
    };

    return (
        <VolumeButton>
            <IconWrapper onClick={toggleMute}>{muted ? <MuteIcon /> : <SoundIcon />}</IconWrapper>
            <ProgressBarWrapper active={dragging} onMouseDown={onMouseDown} onTouchStart={onTouchStart}>
                <ProgressBar>
                    <ProgressBarInner width={muted ? 0 : volume} />
                </ProgressBar>
                <ProgressBarKnob pos={muted ? 0 : volume} />
            </ProgressBarWrapper>
        </VolumeButton>
    );
};
