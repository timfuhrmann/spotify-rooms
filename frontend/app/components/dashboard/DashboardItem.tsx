import React from "react";
import Link from "next/link";
import styled from "styled-components";
import { Server } from "../../types/server";

const ItemName = styled.div`
    width: 100%;
    transition: transform 0.3s;
    will-change: transform;

    @media ${p => p.theme.bp.m} {
        width: 50%;
    }
`;

const Item = styled.a`
    width: 100%;
    padding: 1.5rem 0;
    border-top: 0.1rem solid ${p => p.theme.borderColor};
    transition: background-color 0.3s;
    will-change: background-color;

    @media ${p => p.theme.bp.m} {
        display: flex;
        align-items: center;
        height: 7rem;
        padding: 0;
    }

    @media ${p => p.theme.bp.l} {
        @media (hover: hover) {
            &:hover {
                background-color: ${p => p.theme.primary};

                ${ItemName} {
                    transform: translate3d(2rem, 0, 0);
                }
            }
        }
    }
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

const Cover = styled.img`
    width: 5rem;
    height: 5rem;
    margin-right: 2rem;
`;

export const DashboardItem: React.FC<Server.Room> = ({ id, name, active }) => {
    const albumCover = active && active.album.images[Math.max(0, active.album.images.length - 2)];

    return (
        <Link href={`/room/${id}`} passHref>
            <Item>
                <ItemName>{name}</ItemName>
                {active ? (
                    <ActiveTrack>
                        <Cover src={albumCover} />
                        {active.artists.map((name, index) => (index > 0 ? ", " : "") + name)}
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
