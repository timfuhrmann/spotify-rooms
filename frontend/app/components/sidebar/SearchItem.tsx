import React from "react";
import styled from "styled-components";
import { Server } from "../../types/server";

const ItemWrapper = styled.button`
    display: flex;
    width: 100%;
    align-items: center;
    padding: 1.5rem 0;
    transition: background-color 0.1s;

    @media (hover: hover) {
        &:hover {
            background-color: ${p => p.theme.green};
        }
    }

    &:disabled {
        border-bottom: 0.1rem solid ${p => p.theme.borderColor};
        pointer-events: none;
    }

    @media ${p => p.theme.bp.l} {
        padding: 2rem;
    }
`;

const Cover = styled.img`
    width: 5rem;
    height: 5rem;
    margin-right: 2rem;
`;

interface SearchItemProps extends Server.ResTrack {
    onClick?: () => void;
}

export const SearchItem: React.FC<SearchItemProps> = ({ onClick, name, album, artists }) => {
    const albumCover = album.images[Math.max(0, album.images.length - 2)];

    return (
        <ItemWrapper onClick={onClick} disabled={!onClick}>
            <Cover src={albumCover} />
            {artists.map((artistName, index) => (index > 0 ? ", " : "") + artistName)}
            {" - "}
            {name}
        </ItemWrapper>
    );
};
