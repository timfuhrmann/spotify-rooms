import React from "react";
import { GetServerSideProps } from "next";
import styled from "styled-components";
import { Template } from "../../app/template/Template";
import { getSpotifyAccessToken } from "../../app/lib/api/auth";
import { setCookie } from "nookies";
import { APP_COOKIES, checkAccessToken, getCookieDate } from "../../app/lib/util/api/Cookies";
import { SecondaryHeadline } from "../../app/css/typography";
import { Content } from "../../app/css/content";
import { DashboardItem } from "../../app/components/dashboard/DashboardItem";
import { useData } from "../../app/context/websocket/WebsocketContext";
import { Loading } from "../../app/components/loading/Loading";
import { Footer } from "../../app/components/footer/Footer";

const DashboardWrapper = styled.div`
    padding-top: 12.5rem;
`;

const DashboardList = styled.div`
    margin-top: 1rem;
`;

const Dashboard: React.FC = () => {
    const { rooms } = useData();

    return (
        <Template title="Dashboard - Live Music for Spotify">
            <DashboardWrapper>
                <Content>
                    <SecondaryHeadline>Rooms</SecondaryHeadline>
                    <Loading condition={rooms && Object.keys(rooms).length > 0}>
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

export const getServerSideProps: GetServerSideProps = async context => {
    const { code } = context.query;

    if (code) {
        const res = await getSpotifyAccessToken(code as string);

        if (res.access_token) {
            setCookie(context, APP_COOKIES, JSON.stringify(res), {
                httpOnly: true,
                path: "/",
                expires: getCookieDate(),
            });

            return {
                redirect: {
                    destination: "/dashboard",
                    permanent: false,
                },
            };
        }
    } else {
        return checkAccessToken(context);
    }

    return {
        redirect: {
            destination: "/",
            permanent: false,
        },
    };
};

export default Dashboard;
