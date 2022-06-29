import React from "react";
import styled from "styled-components";
import { GetStaticProps } from "next";
import { fillParent } from "@css/helper";
import { Meta } from "@lib/meta";
import { content } from "@css/helper/content";

const SorryWrapper = styled.div`
    ${fillParent};
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    ${content()};
`;

const Sorry: React.FC = () => {
    return (
        <SorryWrapper>
            <Meta title="Sorry - Live Music for Spotify" />
            Sorry for baring you! But, unfortunately we&apos;re not able to support your browser yet :(
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
