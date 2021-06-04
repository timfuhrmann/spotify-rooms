import React, { useRef } from "react";
import { useLottie } from "../../../lib/util/Lottie";
import styled from "styled-components";
import { SkipForward } from "../../../icons/SkipForward";
import { Mute } from "../../../icons/Mute";
import { Sound } from "../../../icons/Sound";

const VolumeButton = styled.button`
    display: block;
`;

const MuteIcon = styled(Mute)`
    width: 2.4rem;
    height: 2.4rem;
`;

const SoundIcon = styled(Sound)`
    width: 2.4rem;
    height: 2.4rem;
`;

interface VolumeProps {
    muted: boolean;
    onClick: () => void;
}

export const Volume: React.FC<VolumeProps> = ({ muted, onClick }) => {
    return <VolumeButton onClick={onClick}>{muted ? <MuteIcon /> : <SoundIcon />}</VolumeButton>;
};
