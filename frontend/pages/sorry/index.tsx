import React from "react";
import styled from "styled-components";
import { GetStaticProps } from "next";
import { Content, fillParent } from "@css/content";
import { Meta } from "@lib/meta";

const SorryWrapper = styled.div`
    ${fillParent};
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
`;

const Sorry: React.FC = () => {
    return (
        <SorryWrapper>
            <Meta title="Sorry - Live Music for Spotify" />
            <Content>
                Sorry for baring you! But, unfortunately we&apos;re not able to support your browser yet :(
            </Content>
        </SorryWrapper>
    );
};

export const getStaticProps: GetStaticProps = async () => {
    return {
        props: {
            hideNav: true,
        },
    };
};

export default Sorry;
