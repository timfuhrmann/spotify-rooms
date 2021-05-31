import React from "react";
import styled from "styled-components";
import { Logo } from "../../icons/Logo";
import Link from "next/link";
import { ThemeSwitch } from "./ThemeSwitch";

const NavigationWrapper = styled.div`
    position: fixed;
    z-index: 1;
    top: 0;
    left: 0;
    width: 100%;
    padding: 3rem 4rem;
`;

const NavigationInner = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

const LogoWrapper = styled.button``;

const LogoIcon = styled(Logo)`
    color: ${p => p.theme.logo};
    width: 12.5rem;
`;

export const Navigation: React.FC = () => {
    return (
        <NavigationWrapper>
            <NavigationInner>
                <Link href="/dashboard">
                    <LogoWrapper>
                        <LogoIcon />
                    </LogoWrapper>
                </Link>
                <ThemeSwitch />
            </NavigationInner>
        </NavigationWrapper>
    );
};
