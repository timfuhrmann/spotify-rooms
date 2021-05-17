import React, { useState } from "react";
import styled from "styled-components";
import { SidebarSearch } from "./SidebarSearch";

import { SecondaryHeadline } from "../../css/typography/headlines";
import { SearchItem } from "./SearchItem";
import { useRTC } from "../../context/rtc/RTCContext";

const SidebarWrapper = styled.div<{ active: boolean }>`
    width: 45rem;
    max-width: ${p => (p.active ? "45rem" : 0)};
    height: 100%;
    overflow: hidden;
    transition: max-width 0.4s;
    will-change: max-width;
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
    padding: 2rem;
`;

const SidebarList = styled.div`
    padding: 0 2rem;
    flex: 1;
    overflow-y: auto;
`;

const SidebarButton = styled.button`
    position: fixed;
    z-index: 5;
    top: 5rem;
    right: 5rem;
`;

export const Sidebar: React.FC = () => {
    const { playlist } = useRTC();
    const [active, setActive] = useState<boolean>(true);

    return (
        <>
            <SidebarWrapper active={active}>
                <SidebarInner>
                    <SidebarHead>
                        <SecondaryHeadline>Playlist</SecondaryHeadline>
                    </SidebarHead>
                    <SidebarList>
                        {playlist
                            .sort((a, b) => a.date - b.date)
                            .map(track => (
                                <SearchItem key={track.id} {...track} />
                            ))}
                    </SidebarList>
                    <SidebarSearch />
                </SidebarInner>
            </SidebarWrapper>
            <SidebarButton onClick={() => setActive(prevState => !prevState)}>X</SidebarButton>
        </>
    );
};
