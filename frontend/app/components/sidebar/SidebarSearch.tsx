import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { debounce } from "lodash";
import { Api } from "../../types/api";
import { getTrackByString } from "../../lib/api/frontend";
import { useSpotify } from "../../context/spotify/SpotifyContext";
import { SearchItem } from "./SearchItem";

import { Input } from "../../css/input";
import { useRTC } from "../../context/rtc/RTCContext";
import { useRouter } from "next/router";

const SidebarSearchOverlay = styled.div<{ hasResults: boolean }>`
    position: absolute;
    z-index: 2;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: ${p => p.theme.body};
    opacity: ${p => (p.hasResults ? 0.85 : 0)};
    transition: opacity 0.3s;
`;

const SidebarSearchWrapper = styled.div`
    position: absolute;
    z-index: 2;
    bottom: 0;
    left: 0;
    width: 100%;
    background-color: ${p => p.theme.body};
`;

const SidebarInputWrapper = styled.div<{ hasResults: boolean }>`
    padding: 2rem;
    border-top: ${p => p.hasResults && `0.1rem solid ${p.theme.borderColor}`};
    border-bottom: ${p => p.hasResults && `0.1rem solid ${p.theme.borderColor}`};
`;

const SearchResultList = styled.div<{ hasResults: boolean }>`
    max-height: ${p => (p.hasResults ? "50vh" : "0")};
    overflow-y: scroll;
    transition: max-height 0.3s;

    ::-webkit-scrollbar {
        display: none;
    }
`;

export const SidebarSearch: React.FC = () => {
    const router = useRouter();
    const { id } = router.query;
    const { authToken } = useSpotify();
    const { addTrackToPlaylist } = useRTC();
    const [search, setSearch] = useState<string>("");
    const [searchResults, setSearchResults] = useState<Api.SpotifyTrack[]>([]);

    useEffect(() => {
        searchByString(search);
    }, [search]);

    const searchByString = debounce((str: string) => {
        if (!str) {
            setSearchResults([]);
            return;
        }

        getTrackByString(authToken, str).then(res => {
            setSearchResults(res.tracks.items);
        });
    }, 80);

    const addToPlaylist = (track: Api.SpotifyTrack) => {
        if (!id) {
            return;
        }

        addTrackToPlaylist(id as string, track)
            .then(() => setSearch(""))
            .catch(console.error);
    };

    return (
        <>
            <SidebarSearchOverlay hasResults={searchResults.length > 0} />
            <SidebarSearchWrapper>
                <SidebarInputWrapper hasResults={searchResults.length > 0}>
                    <Input
                        type="text"
                        placeholder="Your favourite song..."
                        value={search}
                        onInput={e => setSearch((e.target as HTMLInputElement).value)}
                    />
                </SidebarInputWrapper>
                <SearchResultList hasResults={searchResults.length > 0}>
                    {searchResults.map(track => (
                        <SearchItem key={track.id} onClick={() => addToPlaylist(track)} {...track} />
                    ))}
                </SearchResultList>
            </SidebarSearchWrapper>
        </>
    );
};
