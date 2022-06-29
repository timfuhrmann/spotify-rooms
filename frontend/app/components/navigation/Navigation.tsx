import React from "react";
import styled from "styled-components";
import Link from "next/link";
import { Logo } from "@icons/Logo";
import { NavigationTheme } from "./NavigationTheme";
import { NavigationHamburger } from "./NavigationHamburger";
import { useData } from "@lib/context/websocket";
import { breakpoints } from "@css/helper/breakpoints";

const NavigationWrapper = styled.div`
    position: fixed;
    z-index: 3;
    top: 0;
    left: 0;
    width: 100%;
    padding: 2rem;

    ${breakpoints().min("l")} {
        padding: 3rem 2rem;
    }
`;

const NavigationInner = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

const LogoWrapper = styled.a``;

const HamburgerWrapper = styled.div`
    margin-left: 2rem;
`;

const ControlsWrapper = styled.div`
    display: flex;
    align-item: center;
`;

const LogoIcon = styled(Logo)`
    color: ${p => p.theme.logo};
    width: 12.5rem;
`;

export const Navigation: React.FC = () => {
    const { search } = useData();

    return (
        <NavigationWrapper>
            <NavigationInner>
                <Link href="/dashboard" passHref>
                    <LogoWrapper>
                        <LogoIcon />
                    </LogoWrapper>
                </Link>
                <ControlsWrapper>
                    <NavigationTheme />
                    {search.active !== null && (
                        <HamburgerWrapper>
                            <NavigationHamburger active={search.active} onClick={search.toggle} />
                        </HamburgerWrapper>
                    )}
                </ControlsWrapper>
            </NavigationInner>
        </NavigationWrapper>
    );
};
