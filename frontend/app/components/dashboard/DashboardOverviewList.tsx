import React from "react";
import { DashboardItemSkeleton, DashboardOverviewListItem } from "./DashboardOverviewListItem";
import { Server } from "@type/server";

interface DashboardOverviewListProps {
    rooms: Record<string, Server.Room>;
}

export const DashboardOverviewList: React.FC<DashboardOverviewListProps> = ({ rooms }) => {
    return (
        <React.Fragment>
            {Object.keys(rooms).map(rid => (
                <DashboardOverviewListItem key={rid} {...rooms[rid]} />
            ))}
        </React.Fragment>
    );
};

export const DashboardOverviewListSkeleton: React.FC = () => {
    return (
        <React.Fragment>
            {[...Array(5)].map((_, index) => (
                <DashboardItemSkeleton key={index} />
            ))}
        </React.Fragment>
    );
};
