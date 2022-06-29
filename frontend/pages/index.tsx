import React from "react";
import styled from "styled-components";
import { Headline, TertiaryHeadline } from "@css/typography";
import { LogoIcon } from "@icons/LogoIcon";
import { fillParent } from "@css/helper";
import { Footer } from "../app/components/footer/Footer";
import { Meta } from "@lib/meta";
import { Button } from "../app/components/button/Button";
import { content } from "@css/helper/content";

const HomeWrapper = styled.div`
    ${fillParent};
    opacity: 0;
    animation: opener 2s ease forwards;
    will-change: opacity;

    @keyframes opener {
        100% {
            opacity: 1;
        }
    }
`;

const HomeContent = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100%;
    ${content()};
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
    return (
        <HomeWrapper>
            <Meta title="Live Music for Spotify" />
            <HomeContent>
                <Headline>Spotify, but in rooms.</Headline>
                <TextWrapper>
                    <TertiaryHeadline>
                        Share your favourite music in realtime with strangers from all around the world.
                    </TertiaryHeadline>
                </TextWrapper>
                <HomeButton>
                    <Button action="/api/auth/login" useAnchorElement>
                        <ButtonIcon />
                        Let&apos;s gooo
                    </Button>
                </HomeButton>
            </HomeContent>
            <Footer />
        </HomeWrapper>
    );
};

export default Home;
