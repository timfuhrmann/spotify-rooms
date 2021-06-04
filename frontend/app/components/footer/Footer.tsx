import React from "react";
import styled from "styled-components";
import { Logout } from "./controls/Logout";

const FooterWrapper = styled.div`
    position: fixed;
    z-index: 1;
    bottom: 0;
    left: 0;
    width: 100%;
    padding: 3rem 4rem;
`;

export const Footer: React.FC = () => {
    return (
        <FooterWrapper>
            <Logout />
        </FooterWrapper>
    );
};
