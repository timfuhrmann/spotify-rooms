import React from "react";
import styled from "styled-components";
import Link from "next/link";
import { Logout } from "./controls/Logout";
import { useSpotify } from "../../context/spotify/SpotifyContext";

const FooterWrapper = styled.div`
    position: fixed;
    z-index: 1;
    bottom: 0;
    left: 0;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    padding: 2rem;
    font-weight: 300;
    text-align: center;

    @media ${p => p.theme.bp.l} {
        display: flex;
    }
`;

const FooterInfo = styled.div`
    opacity: 0.6;
`;

const FooterLink = styled(FooterInfo)`
    margin-bottom: 1rem;

    @media ${p => p.theme.bp.l} {
        order: 2;
    }
`;

export const Footer: React.FC = () => {
    const { authToken } = useSpotify();

    return (
        <FooterWrapper>
            {!authToken && (
                <FooterLink>
                    <Link href="/legal">Legal</Link>
                </FooterLink>
            )}
            <FooterInfo>&copy;2021 Tim Fuhrmann. More to come - Stay tuned!</FooterInfo>
            <Logout />
        </FooterWrapper>
    );
};
