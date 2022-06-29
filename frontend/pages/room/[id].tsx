import React, { useEffect } from "react";
import styled from "styled-components";
import { Player } from "../../app/components/player/Player";
import { useRouter } from "next/router";
import { Sidebar } from "../../app/components/sidebar/Sidebar";
import { useData } from "@lib/context/websocket";
import { titleFromRoom } from "@lib/room";
import { fillParent } from "@css/helper";
import { Users } from "@icons/Users";
import { Meta } from "@lib/meta";
import { content } from "@css/helper/content";
import { breakpoints } from "@css/helper/breakpoints";

const RoomWrapper = styled.div`
    ${fillParent};
    display: flex;
    min-height: 60rem;
`;

const PlayerWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    ${content()};
    flex: 1;
`;

const ViewersCount = styled.div`
    position: fixed;
    bottom: 0;
    left: 0;
    display: flex;
    align-items: center;
    padding: 2rem;

    ${breakpoints().min("l")} {
        padding: 3rem 2rem;
    }
`;

const ViewersIcon = styled(Users)`
    width: 2rem;
    height: 2rem;
    margin-right: 0.5rem;
`;

const Room: React.FC = () => {
    const router = useRouter();
    const { id } = router.query;
    const { connected, room, viewers, joinRoom, leaveRoom, search } = useData();

    useEffect(() => {
        if (!id || "string" !== typeof id || !connected) {
            return;
        }

        joinRoom(id);

        return () => leaveRoom();
    }, [id, connected]);

    return (
        <RoomWrapper>
            <Meta title={room ? titleFromRoom(room) : "Live Music for Spotify"} />
            <PlayerWrapper>{room && <Player />}</PlayerWrapper>
            <Sidebar searchActive={!!search.active} />
            {viewers > 1 && (
                <ViewersCount>
                    <ViewersIcon />
                    {viewers}
                </ViewersCount>
            )}
        </RoomWrapper>
    );
};

export default Room;
