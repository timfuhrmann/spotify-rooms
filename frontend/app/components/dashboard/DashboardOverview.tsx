import React from "react";
import styled from "styled-components";
import { SecondaryHeadline } from "@css/typography";
import { useData } from "@lib/context/websocket";
import { DashboardOverviewList, DashboardOverviewListSkeleton } from "./DashboardOverviewList";
import { useSession } from "@lib/context/session";
import { content } from "@css/helper/content";

const DashboardWrapper = styled.div`
    ${content()};
`;

const DashboardHeadline = styled.div`
    margin-bottom: 1rem;
`;

export const DashboardOverview: React.FC = () => {
    const { authToken } = useSession();
    const { rooms } = useData();

    return (
        <DashboardWrapper>
            <DashboardHeadline>
                <SecondaryHeadline>Rooms</SecondaryHeadline>
            </DashboardHeadline>
            {authToken && rooms && Object.keys(rooms).length > 0 ? (
                <DashboardOverviewList rooms={rooms} />
            ) : (
                <DashboardOverviewListSkeleton />
            )}
        </DashboardWrapper>
    );
};
