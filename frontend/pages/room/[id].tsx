import React, { useEffect } from "react";
import { GetServerSideProps } from "next";
import styled from "styled-components";
import { Template } from "../../app/template/Template";
import { Player } from "../../app/components/player/Player";
import { useRouter } from "next/router";
import { checkAccessToken } from "../../app/lib/util/api/Cookies";
import { Sidebar } from "../../app/components/sidebar/Sidebar";
import { useData } from "../../app/context/websocket/WebsocketContext";
import { getTitleFromActiveRoom } from "../../app/lib/util/TitleFromActiveRoom";
import { useSpotify } from "../../app/context/spotify/SpotifyContext";
import { Content } from "../../app/css/content";

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

const Room: React.FC = () => {
    const router = useRouter();
    const { id } = router.query;
    const { activateSearch, deactivateSearch } = useSpotify();
    const { connected, room, joinRoom, leaveRoom } = useData();

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
        <Template title={getTitleFromActiveRoom(room?.active)}>
            <RoomWrapper>
                <PlayerWrapper>{room && <Player room={room} />}</PlayerWrapper>
                <Sidebar />
            </RoomWrapper>
        </Template>
    );
};

export const getServerSideProps: GetServerSideProps = async context => {
    return checkAccessToken(context);
};

export default Room;
