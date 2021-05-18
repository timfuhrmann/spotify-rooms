import React, { useRef } from "react";
import styled from "styled-components";
import {useLottie} from "../../lib/util/useLottie";

const ButtonFrame = styled.button`
    display: block;
    width: 4rem;
    height: 4rem;
`;

interface VolumeProps {
    onClick: () => void;
}

export const Hamburger: React.FC<VolumeProps> = ({ onClick }) => {
    const buttonRef = useRef<HTMLButtonElement>(null);
    const { play } = useLottie(buttonRef, "hamburger", "/controls/x.json", {
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
