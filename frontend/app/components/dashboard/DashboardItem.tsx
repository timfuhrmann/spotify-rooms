import React from "react";
import Link from "next/link";
import { Api } from "../../types/api";
import styled from "styled-components";
import { Server } from "../../types/server";

const Item = styled.button`
    display: flex;
    align-items: center;
    width: 100%;
    height: 7rem;
    border-top: .1rem solid rgba(255, 255, 255, 0.5);
`;

const ItemName = styled.div`
    width: 50%
`;

const ActiveTrack = styled.div`
    display: flex;
    align-items: center;
    width: 50%;
`;

const Cover = styled.img`
    width: 5rem;
    height: 5rem;
    margin-right: 2rem;
`;

export const DashboardItem: React.FC<Server.Room> = ({ id, name, active }) => {
    const albumCover = active && active.album.images[Math.max(0, active.album.images.length - 2)];

    return (
        <Link href={`/room/${id}`}>
            <Item>
                <ItemName>{name}</ItemName>
                {active && (
                    <ActiveTrack>
                        <Cover src={albumCover} />
                        {active.artists.map((name, index) => (index > 0 ? ", " : "") + name)}
                        {" - "}
                        {active.name}
                    </ActiveTrack>
                )}
            </Item>
        </Link>
    );
};
