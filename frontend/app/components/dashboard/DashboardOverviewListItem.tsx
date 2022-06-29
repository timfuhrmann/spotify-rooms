import React from "react";
import Link from "next/link";
import styled from "styled-components";
import Image from "next/image";
import { Server } from "@type/server";
import { hover, transition } from "@css/helper";
import { breakpoints } from "@css/helper/breakpoints";

const ItemName = styled.div`
    width: 100%;
    transition: transform 0.3s;
    will-change: transform;

    ${breakpoints().min("m")} {
        width: 50%;
    }
`;

const ItemTextSkeleton = styled.div`
    display: inline-block;
    width: 30%;
    background-color: ${p => p.theme.loading};
`;

const ItemWrapper = styled.a`
    display: inline-block;
    width: 100%;
    padding: 1.5rem 0;
    border-top: 0.1rem solid ${p => p.theme.borderColor};
    ${transition("background-color", "0.3s")};

    ${breakpoints().min("m")} {
        display: flex;
        align-items: center;
        height: 7rem;
        padding: 0;
    }

    ${breakpoints().min("l")} {
        ${p => hover`
            background-color: ${p.theme.primary};
            
            ${ItemName} {
                transform: translate3d(2rem, 0, 0);
            }
      `};
    }
`;

const ItemSkeleton = styled(ItemWrapper)`
    color: transparent;
    pointer-events: none;
`;

const ItemActiveTrack = styled.div`
    display: flex;
    align-items: center;
    width: 100%;
    margin-top: 0.5rem;

    ${breakpoints().min("m")} {
        width: 50%;
        margin-top: 0;
    }
`;

const ItemNoActiveTrack = styled.div`
    opacity: 0.6;
`;

const ItemCover = styled.div`
    position: relative;
    min-width: 5rem;
    width: 5rem;
    height: 5rem;
    margin-right: 2rem;
    background-color: ${p => p.theme.loading};
`;

export const DashboardOverviewListItem: React.FC<Server.Room> = ({ id, name, active }) => {
    const albumCover = active ? active.album.images[Math.max(0, active.album.images.length - 2)] : null;

    return (
        <Link href={`/room/${id}`} passHref>
            <ItemWrapper>
                <ItemName>{name}</ItemName>
                {active ? (
                    <ItemActiveTrack>
                        <ItemCover>
                            {albumCover && (
                                <Image src={albumCover} alt={active.name} layout="fill" objectFit="cover" unoptimized />
                            )}
                        </ItemCover>
                        {active.artists.join(", ")}
                        {" - "}
                        {active.name}
                    </ItemActiveTrack>
                ) : (
                    <ItemNoActiveTrack>Seems quiet in here.</ItemNoActiveTrack>
                )}
            </ItemWrapper>
        </Link>
    );
};

export const DashboardItemSkeleton: React.FC = () => {
    return (
        <ItemSkeleton as="div">
            <ItemName>
                <ItemTextSkeleton>Loading...</ItemTextSkeleton>
            </ItemName>
            <ItemActiveTrack>
                <ItemCover as="div" />
                <ItemTextSkeleton>Loading...</ItemTextSkeleton>
            </ItemActiveTrack>
        </ItemSkeleton>
    );
};
