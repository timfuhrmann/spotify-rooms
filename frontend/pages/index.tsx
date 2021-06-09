import React from "react";
import styled from "styled-components";
import { Template } from "../app/template/Template";
import { Headline, TertiaryHeadline } from "../app/css/typography";
import { ButtonSpotify } from "../app/css/buttons";
import { LogoIcon } from "../app/icons/LogoIcon";
import { GetServerSideProps } from "next";
import { getAccessTokenFromCookies } from "../app/lib/util/api/Cookies";
import { requestSpotifyLoginUrl } from "../app/lib/api/auth";
import { Content, transition } from "../app/css/content";
import { validateBrowser } from "../app/lib/util/Browser";

const HomeWrapper = styled.div`
    ${transition};
    width: 100%;
    height: 100%;
`;

const HomeContent = styled(Content)`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100%;
    text-align: center;
`;

const HomeButton = styled.div`
    margin-top: 3rem;
`;

const ButtonIcon = styled(LogoIcon)`
    width: 3rem;
    margin-right: 1rem;
`;

const TextWrapper = styled.div`
    margin: 2rem 0 1rem;
`;

const Home: React.FC = () => {
    const initAuth = async () => {
        const { status, data } = await requestSpotifyLoginUrl();

        if (200 === status && data) {
            window.location.href = data.url;
        }
    };

    return (
        <Template title="Live Music for Spotify">
            <HomeWrapper>
                <HomeContent>
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
                </HomeContent>
            </HomeWrapper>
        </Template>
    );
};

export const getServerSideProps: GetServerSideProps = async ctx => {
    const { auth } = ctx.query;
    const access_token = getAccessTokenFromCookies(ctx.req.cookies);

    if ("logout" !== auth && access_token) {
        return {
            redirect: {
                destination: "/dashboard",
                permanent: false,
            },
        };
    }

    return validateBrowser(ctx);
};

export default Home;
