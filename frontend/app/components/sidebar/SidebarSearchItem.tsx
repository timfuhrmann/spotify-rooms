import React from "react";
import styled from "styled-components";
import Image from "next/image";
import { Server } from "@type/server";
import { breakpoints } from "@css/helper/breakpoints";

const ItemWrapper = styled.button`
    display: flex;
    width: 100%;
    align-items: center;
    padding: 1.5rem 0;
    transition: background-color 0.1s;

    @media (hover: hover) {
        &:hover {
            background-color: ${p => p.theme.primary};
        }
    }

    &:disabled {
        border-bottom: 0.1rem solid ${p => p.theme.borderColor};
        pointer-events: none;
    }

    ${breakpoints().min("l")} {
        padding: 2rem;
    }
`;

const Cover = styled.div`
    position: relative;
    min-width: 5rem;
    width: 5rem;
    height: 5rem;
    margin-right: 2rem;
    background-color: ${p => p.theme.loading};
`;

interface SidebarSearchItemProps extends Server.ResTrack {
    onClick?: () => void;
}

export const SidebarSearchItem: React.FC<SidebarSearchItemProps> = ({ onClick, name, album, artists }) => {
    const albumCover = album.images[Math.max(0, album.images.length - 2)];

    return (
        <ItemWrapper onClick={onClick} disabled={!onClick}>
            <Cover>
                <Image src={albumCover} alt={name} layout="fill" objectFit="cover" unoptimized />
            </Cover>
            {artists.map((artistName, index) => (index > 0 ? ", " : "") + artistName)}
            {" - "}
            {name}
        </ItemWrapper>
    );
};
