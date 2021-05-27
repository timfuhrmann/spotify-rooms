import React, { useEffect } from "react";
import { GetServerSideProps } from "next";
import styled from "styled-components";
import { Template } from "../../app/template/Template";
import { Player } from "../../app/components/player/Player";
import { useRouter } from "next/router";
import { getAccessTokenFromCookies } from "../../app/lib/util/api/checkCookies";
import { Sidebar } from "../../app/components/sidebar/Sidebar";
import { useData } from "../../app/context/websocket/WebsocketContext";
import { getTitleFromActiveRoom } from "../../app/lib/util/titleFromActiveRoom";

const RoomWrapper = styled.div`
    display: flex;
    width: 100%;
    height: 100%;
`;

const PlayerWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex: 1;
`;

const Room: React.FC = () => {
    const router = useRouter();
    const { id } = router.query;
    const { connected, room, joinRoom, leaveRoom } = useData();

    useEffect(() => {
        if (!id || !connected) {
            return;
        }

        joinRoom(id as string);
        return () => {
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
    const access_token = getAccessTokenFromCookies(context.req.cookies);

    if (access_token) {
        return {
            props: {
                authToken: access_token,
            },
        };
    } else {
        return {
            redirect: {
                destination: "/",
                permanent: false,
            },
        };
    }
};

export default Room;
