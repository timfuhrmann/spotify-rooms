import React from "react";
import styled from "styled-components";
import { SecondaryHeadline } from "@css/typography";
import { Content } from "@css/content";
import { DashboardItem, DashboardItemSkeleton } from "../../app/components/dashboard/DashboardItem";
import { useData } from "@lib/context/websocket";
import { Footer } from "../../app/components/footer/Footer";
import { useSpotify } from "@lib/context/spotify";
import { Meta } from "@lib/meta";

const DashboardWrapper = styled.div`
    padding: 12.5rem 0;
`;

const DashboardHeadline = styled.div`
    margin-bottom: 1rem;
`;

const Dashboard: React.FC = () => {
    const { authToken } = useSpotify();
    const { rooms } = useData();

    return (
        <React.Fragment>
            <DashboardWrapper>
                <Meta title="Dashboard - Live Music for Spotify" />
                <Content>
                    <DashboardHeadline>
                        <SecondaryHeadline>Rooms</SecondaryHeadline>
                    </DashboardHeadline>
                    {authToken && rooms && Object.keys(rooms).length > 0 ? (
                        <React.Fragment>
                            {Object.keys(rooms).map(rid => (
                                <DashboardItem key={rid} {...rooms[rid]} />
                            ))}
                        </React.Fragment>
                    ) : (
                        <React.Fragment>
                            {[...Array(5)].map((_, index) => (
                                <DashboardItemSkeleton key={index} />
                            ))}
                        </React.Fragment>
                    )}
                </Content>
            </DashboardWrapper>
            <Footer />
        </React.Fragment>
    );
};

export default Dashboard;
