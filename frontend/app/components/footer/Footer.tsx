import React from "react";
import styled from "styled-components";
import Link from "next/link";
import { LogOut } from "@icons/LogOut";
import { useSession } from "@lib/context/session";
import { breakpoints } from "@css/helper/breakpoints";

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

    ${breakpoints().min("l")} {
        display: flex;
    }
`;

const FooterInfo = styled.div`
    opacity: 0.6;
`;

const FooterLink = styled(FooterInfo)`
    margin-bottom: 1rem;

    ${breakpoints().min("l")} {
        order: 2;
        margin-bottom: 0;
    }
`;

const LogoutLink = styled.a`
    display: flex;
`;

export const Footer: React.FC = () => {
    const { authToken } = useSession();

    return (
        <FooterWrapper>
            {!authToken && (
                <FooterLink>
                    <Link href="/legal">Legal</Link>
                </FooterLink>
            )}
            <FooterInfo>More to come - Stay tuned!</FooterInfo>
            {authToken && (
                <LogoutLink href="/api/auth/logout">
                    <LogOut width={24} />
                </LogoutLink>
            )}
        </FooterWrapper>
    );
};
