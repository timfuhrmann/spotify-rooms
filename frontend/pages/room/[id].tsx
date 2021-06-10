import React, { useEffect } from "react";
import styled from "styled-components";
import { GetServerSideProps } from "next";
import { Template } from "../../app/template/Template";
import { Player } from "../../app/components/player/Player";
import { useRouter } from "next/router";
import { checkAccessToken } from "../../app/lib/util/api/Cookies";
import { Sidebar } from "../../app/components/sidebar/Sidebar";
import { useData } from "../../app/context/websocket/WebsocketContext";
import { titleFromRoom } from "../../app/lib/util/RoomTitle";
import { useSpotify } from "../../app/context/spotify/SpotifyContext";
import { Content } from "../../app/css/content";
import { Users } from "../../app/icons/Users";

const RoomWrapper = styled.div`
    display: flex;
    width: 100%;
    height: 100%;
`;

const PlayerWrapper = styled(Content)`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    flex: 1;
`;

const ViewersCount = styled.div`
    position: fixed;
    bottom: 0;
    left: 0;
    display: flex;
    align-items: center;
    padding: 2rem;

    @media ${p => p.theme.bp.l} {
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
    const { activateSearch, deactivateSearch } = useSpotify();
    const { connected, room, viewers, joinRoom, leaveRoom } = useData();

    useEffect(() => {
        if (!id || !connected) {
            return;
        }

        activateSearch();
        joinRoom(id as string);

        return () => {
            deactivateSearch();
            leaveRoom();
        };
    }, [id, connected]);

    return (
        <Template title={titleFromRoom(room)}>
            <RoomWrapper>
                <PlayerWrapper>{room && <Player room={room} />}</PlayerWrapper>
                <Sidebar />
                {viewers > 1 && (
                    <ViewersCount>
                        <ViewersIcon />
                        {viewers}
                    </ViewersCount>
                )}
            </RoomWrapper>
        </Template>
    );
};

export const getServerSideProps: GetServerSideProps = async ctx => {
    return checkAccessToken(ctx);
};

export default Room;
