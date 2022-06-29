import React from "react";
import Link from "next/link";
import styled from "styled-components";
import Image from "next/image";
import { Server } from "@type/server";
import { hover, transition } from "@css/content";

const ItemName = styled.div`
    width: 100%;
    transition: transform 0.3s;
    will-change: transform;

    @media ${p => p.theme.bp.m} {
        width: 50%;
    }
`;

const ItemTextSkeleton = styled.div`
    display: inline-block;
    width: 30%;
    background-color: ${p => p.theme.loading};
`;

const Item = styled.a`
    width: 100%;
    padding: 1.5rem 0;
    border-top: 0.1rem solid ${p => p.theme.borderColor};
    ${transition("background-color", "0.3s")};

    @media ${p => p.theme.bp.m} {
        display: flex;
        align-items: center;
        height: 7rem;
        padding: 0;
    }

    @media ${p => p.theme.bp.l} {
        ${p => hover`
            background-color: ${p.theme.primary};
            
            ${ItemName} {
                transform: translate3d(2rem, 0, 0);
            }
      `};
    }
`;

const ItemSkeleton = styled(Item)`
    color: transparent;
    pointer-events: none;
`;

const ActiveTrack = styled.div`
    display: flex;
    align-items: center;
    width: 100%;
    margin-top: 0.5rem;

    @media ${p => p.theme.bp.m} {
        width: 50%;
        margin-top: 0;
    }
`;

const NoActiveTrack = styled.div`
    opacity: 0.6;
`;

const Cover = styled.div`
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
            <Item>
                <ItemName>{name}</ItemName>
                {active ? (
                    <ActiveTrack>
                        <Cover>
                            {albumCover && (
                                <Image src={albumCover} alt={active.name} layout="fill" objectFit="cover" unoptimized />
                            )}
                        </Cover>
                        {active.artists.join(", ")}
                        {" - "}
                        {active.name}
                    </ActiveTrack>
                ) : (
                    <NoActiveTrack>Seems quiet in here.</NoActiveTrack>
                )}
            </Item>
        </Link>
    );
};

export const DashboardItemSkeleton: React.FC = () => {
    return (
        <ItemSkeleton as="div">
            <ItemName>
                <ItemTextSkeleton>Loading...</ItemTextSkeleton>
            </ItemName>
            <ActiveTrack>
                <Cover as="div" />
                <ItemTextSkeleton>Loading...</ItemTextSkeleton>
            </ActiveTrack>
        </ItemSkeleton>
    );
};
