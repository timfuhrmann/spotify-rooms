import React, { useState } from "react";
import styled from "styled-components";
import { SidebarSearch } from "./SidebarSearch";
import { SearchItem } from "./SearchItem";
import { SecondaryHeadline } from "../../css/typography";
import { useData } from "../../context/websocket/WebsocketContext";
import { getSortedPlaylist } from "../../lib/util/SortedPlaylist";
import { useSpotify } from "../../context/spotify/SpotifyContext";

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
    padding: 0 2rem 10rem;
    flex: 1;
    overflow-y: auto;
`;

export const Sidebar: React.FC = () => {
    const { searchActive } = useSpotify();
    const { playlist } = useData();

    return (
        <SidebarWrapper active={searchActive}>
            <SidebarInner>
                <SidebarHead>
                    <SecondaryHeadline>Playlist</SecondaryHeadline>
                </SidebarHead>
                <SidebarList>
                    {getSortedPlaylist(Object.keys(playlist), playlist).map(trackId => (
                        <SearchItem key={trackId} {...playlist[trackId]} />
                    ))}
                </SidebarList>
                <SidebarSearch />
            </SidebarInner>
        </SidebarWrapper>
    );
};
