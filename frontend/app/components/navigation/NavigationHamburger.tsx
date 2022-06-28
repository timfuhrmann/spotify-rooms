import React from "react";
import styled from "styled-components";
import { Close } from "@icons/Close";
import { Menu } from "@icons/Menu";

const ButtonFrame = styled.button`
    display: flex;
`;

const CloseIcon = styled(Close)<{ $active: boolean }>`
    display: ${p => (p.$active ? "none" : "block")};
    width: 2.4rem;
    height: 2.4rem;

    @media ${p => p.theme.bp.l} {
        display: ${p => (p.$active ? "block" : "none")};
    }
`;

const ListIcon = styled(Menu)<{ $active: boolean }>`
    display: ${p => (p.$active ? "block" : "none")};
    width: 2.4rem;
    height: 2.4rem;

    @media ${p => p.theme.bp.l} {
        display: ${p => (p.$active ? "none" : "block")};
    }
`;

interface VolumeProps {
    active: boolean;
    onClick: () => void;
}

export const NavigationHamburger: React.FC<VolumeProps> = ({ active, onClick }) => {
    return (
        <ButtonFrame type="button" onClick={onClick}>
            <CloseIcon $active={active} />
            <ListIcon $active={active} />
        </ButtonFrame>
    );
};
