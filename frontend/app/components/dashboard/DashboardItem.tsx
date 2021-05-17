import React from "react";
import Link from "next/link";
import { Api } from "../../types/api";
import styled from "styled-components";
import { Server } from "../../types/server";

const Item = styled.button`
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
`;

const ActiveTrack = styled.div`
    display: flex;
    align-items: center;
`;

const Cover = styled.img`
    width: 5rem;
    height: 5rem;
    margin-right: 2rem;
`;

export const DashboardItem: React.FC<Server.Room> = ({ id, name, activeTrack }) => {
    const albumCover = activeTrack && activeTrack.album.images[Math.max(0, activeTrack.album.images.length - 2)];

    return (
        <Link href={`/room/${id}`}>
            <Item>
                <span>{name}</span>
                {activeTrack && (
                    <ActiveTrack>
                        <Cover src={albumCover.url} />
                        {activeTrack.artists.map((artist, index) => (index > 0 ? ", " : "") + artist.name)}
                        {" - "}
                        {activeTrack.name}
                    </ActiveTrack>
                )}
            </Item>
        </Link>
    );
};
