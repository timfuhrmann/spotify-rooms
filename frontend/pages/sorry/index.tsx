import React from "react";
import { GetServerSideProps } from "next";
import styled from "styled-components";
import { Template } from "../../app/template/Template";
import { Content } from "../../app/css/content";

const SorryWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    text-align: center;
`;

const Sorry: React.FC = () => {
    return (
        <Template title="Sorry - Live Music for Spotify">
            <SorryWrapper>
                <Content>
                    Sorry for baring you! But, unfortunately we're not able to support your browser yet :(
                    <br />
                    We're working on it!
                </Content>
            </SorryWrapper>
        </Template>
    );
};

export const getServerSideProps: GetServerSideProps = async () => {
    return {
        props: {
            hideNav: true,
        },
    };
};

export default Sorry;
