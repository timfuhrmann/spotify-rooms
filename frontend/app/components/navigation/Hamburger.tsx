import React from "react";
import styled from "styled-components";
import { Close } from "../../icons/Close";
import { Menu } from "../../icons/Menu";

const ButtonFrame = styled.button`
    display: block;
`;

const CloseIcon = styled(Close)`
    width: 2.4rem;
    height: 2.4rem;
`;

const ListIcon = styled(Menu)`
    width: 2.4rem;
    height: 2.4rem;
`;

interface VolumeProps {
    active: boolean;
    onClick: () => void;
}

export const Hamburger: React.FC<VolumeProps> = ({ active, onClick }) => {
    return <ButtonFrame onClick={onClick}>{active ? <CloseIcon /> : <ListIcon />}</ButtonFrame>;
};
