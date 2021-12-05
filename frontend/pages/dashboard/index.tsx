import React from "react";
import styled from "styled-components";
import { GetServerSideProps } from "next";
import { Template } from "../../app/template/Template";
import { SecondaryHeadline } from "../../app/css/typography";
import { Content } from "../../app/css/content";
import { DashboardItem } from "../../app/components/dashboard/DashboardItem";
import { useData } from "../../app/context/websocket/WebsocketContext";
import { Loading } from "../../app/components/loading/Loading";
import { Footer } from "../../app/components/footer/Footer";
import { validateAuthentication, validateBrowser } from "../../app/lib/api/server";
import { useSpotify } from "../../app/context/spotify/SpotifyContext";

const DashboardWrapper = styled.div`
    padding-top: 12.5rem;
`;

const DashboardList = styled.div`
    margin-top: 1rem;
`;

const Dashboard: React.FC = () => {
    const { authToken } = useSpotify();
    const { rooms } = useData();

    return (
        <Template title="Dashboard - Live Music for Spotify">
            <DashboardWrapper>
                <Content>
                    <SecondaryHeadline>Rooms</SecondaryHeadline>
                    <Loading condition={authToken && rooms && Object.keys(rooms).length > 0}>
                        <DashboardList>
                            {Object.keys(rooms).map(rid => (
                                <DashboardItem key={rid} {...rooms[rid]} />
                            ))}
                        </DashboardList>
                    </Loading>
                </Content>
            </DashboardWrapper>
            <Footer />
        </Template>
    );
};

export const getServerSideProps: GetServerSideProps = async ctx => {
    const browser = validateBrowser(ctx);

    if (!browser) {
        return {
            redirect: {
                destination: "/sorry",
                permanent: false,
            },
        };
    }

    const authToken = await validateAuthentication(ctx);

    if (!authToken) {
        return {
            redirect: {
                destination: "/",
                permanent: false,
            },
        };
    }

    return {
        props: { authToken },
    };
};

export default Dashboard;
