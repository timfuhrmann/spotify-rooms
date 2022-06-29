import React from "react";
import styled from "styled-components";
import { SecondaryHeadline } from "@css/typography";
import { Content } from "@css/content";
import { useData } from "@lib/context/websocket";
import { DashboardOverviewList, DashboardOverviewListSkeleton } from "./DashboardOverviewList";
import { useSession } from "@lib/context/session";

const DashboardHeadline = styled.div`
    margin-bottom: 1rem;
`;

export const DashboardOverview: React.FC = () => {
    const { authToken } = useSession();
    const { rooms } = useData();

    return (
        <Content>
            <DashboardHeadline>
                <SecondaryHeadline>Rooms</SecondaryHeadline>
            </DashboardHeadline>
            {authToken && rooms && Object.keys(rooms).length > 0 ? (
                <DashboardOverviewList rooms={rooms} />
            ) : (
                <DashboardOverviewListSkeleton />
            )}
        </Content>
    );
};
