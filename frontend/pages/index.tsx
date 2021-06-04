import React from "react";
import styled from "styled-components";
import { Template } from "../app/template/Template";
import { Headline, TertiaryHeadline } from "../app/css/typography";
import { ButtonSpotify } from "../app/css/buttons";
import { LogoIcon } from "../app/icons/LogoIcon";
import { GetServerSideProps } from "next";
import { getAccessTokenFromCookies } from "../app/lib/util/api/checkCookies";
import { requestSpotifyLoginUrl } from "../app/lib/api/auth";

const HomeWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
`;

const HomeButton = styled.div`
    margin-top: 3rem;
`;

const ButtonIcon = styled(LogoIcon)`
    width: 3rem;
    margin-right: 1rem;
`;

const TextWrapper = styled.div`
    max-width: 80rem;
    margin: 2rem 0 1rem;
    text-align: center;
`;

const Home: React.FC = () => {
    const initAuth = async () => {
        const { status, data } = await requestSpotifyLoginUrl();

        if (200 === status && data) {
            window.location.href = data.url;
        }
    };

    return (
        <Template title="Spotify Rooms">
            <HomeWrapper>
                <Headline>Spotify, but in rooms.</Headline>
                <TextWrapper>
                    <TertiaryHeadline>
                        Share your favourite music in realtime with strangers from all around the world.
                    </TertiaryHeadline>
                </TextWrapper>
                <HomeButton>
                    <ButtonSpotify onClick={initAuth}>
                        <ButtonIcon />
                        Let's gooo
                    </ButtonSpotify>
                </HomeButton>
            </HomeWrapper>
        </Template>
    );
};

export const getServerSideProps: GetServerSideProps = async context => {
    const access_token = getAccessTokenFromCookies(context.req.cookies);

    if (access_token) {
        return {
            redirect: {
                destination: "/dashboard",
                permanent: false,
            },
        };
    }

    return {
        props: {},
    };
};

export default Home;
