import React from "react";
import styled from "styled-components";
import { Close } from "../../../icons/Close";
import { Menu } from "../../../icons/Menu";

const CloseIcon = styled(Close)`
    width: 2.4rem;
    height: 2.4rem;
`;

const ListIcon = styled(Menu)`
    width: 2.4rem;
    height: 2.4rem;
`;

const ButtonFrame = styled.button<{ active: boolean }>`
    display: flex;

    ${CloseIcon} {
        display: ${p => (p.active ? "none" : "block")};
    }

    ${ListIcon} {
        display: ${p => (p.active ? "block" : "none")};
    }

    @media ${p => p.theme.bp.l} {
        ${CloseIcon} {
            display: ${p => (p.active ? "block" : "none")};
        }

        ${ListIcon} {
            display: ${p => (p.active ? "none" : "block")};
        }
    }
`;

interface VolumeProps {
    active: boolean;
    onClick: () => void;
}

export const Hamburger: React.FC<VolumeProps> = ({ active, onClick }) => {
    return (
        <ButtonFrame active={active} onClick={onClick}>
            <CloseIcon />
            <ListIcon />
        </ButtonFrame>
    );
};
