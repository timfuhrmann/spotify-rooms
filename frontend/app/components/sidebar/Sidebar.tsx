import React from "react";
import styled from "styled-components";
import { SidebarSearch } from "./SidebarSearch";
import { SidebarSearchItem } from "./SidebarSearchItem";
import { SecondaryHeadline } from "@css/typography";
import { useData } from "@lib/context/websocket";
import { getSortedPlaylist } from "@lib/util";
import { breakpoints } from "@css/helper/breakpoints";

const SidebarWrapper = styled.div<{ active: boolean }>`
    position: fixed;
    z-index: 2;
    top: 0;
    left: 100%;
    width: calc(100% + 0.1rem);
    height: 100%;
    max-width: 45rem;
    transform: ${p => (!p.active ? "translate3d(-100%, 0, 0)" : "translate3d(0, 0, 0)")};
    overflow: hidden;
    background-color: ${p => p.theme.body};
    transition: max-width 0.4s, transform 0.4s;
    will-change: max-width, transform;

    ${breakpoints().min("l")} {
        position: relative;
        left: auto;
        transform: translate3d(0, 0, 0);
        width: 45rem;
        max-width: ${p => (p.active ? "45rem" : 0)};
    }
`;

const SidebarInner = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    width: inherit;
    height: 100%;
    border-left: 0.1rem solid ${p => p.theme.borderColor};
`;

const SidebarHead = styled.div`
    padding: 1rem 2rem;
    opacity: 0;

    ${breakpoints().min("m")} {
        opacity: 1;
    }
`;

const SidebarList = styled.div`
    padding: 0 2rem 10rem;
    flex: 1;
    overflow-y: auto;
`;

interface SidebarProps {
    searchActive: boolean;
}

export const Sidebar: React.FC<SidebarProps> = ({ searchActive }) => {
    const { playlist } = useData();

    return (
        <SidebarWrapper active={searchActive}>
            <SidebarInner>
                <SidebarHead>
                    <SecondaryHeadline>Playlist</SecondaryHeadline>
                </SidebarHead>
                <SidebarList>
                    {getSortedPlaylist(Object.keys(playlist), playlist).map(trackId => (
                        <SidebarSearchItem key={trackId} {...playlist[trackId]} />
                    ))}
                </SidebarList>
                <SidebarSearch />
            </SidebarInner>
        </SidebarWrapper>
    );
};
