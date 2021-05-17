import React, { useRef } from "react";
import { useLottie } from "../../../lib/util/useLottie";
import styled from "styled-components";

const ButtonFrame = styled.button`
    display: block;
    width: 4rem;
    height: 4rem;
    margin-left: auto;
`;

interface VolumeProps {
    onClick: () => void;
}

export const Volume: React.FC<VolumeProps> = ({ onClick }) => {
    const buttonRef = useRef<HTMLButtonElement>(null);
    const { play } = useLottie(buttonRef, "play", "/controls/volume.json", {
        autoplay: false,
        loop: false,
    });

    return (
        <ButtonFrame
            ref={buttonRef}
            onClick={() => {
                play();
                onClick();
            }}
        />
    );
};
