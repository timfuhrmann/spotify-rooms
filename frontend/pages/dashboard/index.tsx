import React from "react";
import styled from "styled-components";
import { Meta } from "@lib/meta";
import { Footer } from "../../app/components/footer/Footer";
import { DashboardOverview } from "../../app/components/dashboard/DashboardOverview";

const DashboardWrapper = styled.div`
    padding: 12.5rem 0;
`;

const Dashboard: React.FC = () => {
    return (
        <React.Fragment>
            <DashboardWrapper>
                <Meta title="Dashboard - Live Music for Spotify" />
                <DashboardOverview />
            </DashboardWrapper>
            <Footer />
        </React.Fragment>
    );
};

export default Dashboard;
