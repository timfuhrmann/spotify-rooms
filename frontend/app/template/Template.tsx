import React from "react";
import styled from "styled-components";
import Head from "next/head";

const Site = styled.div`
    position: absolute;
    width: 100%;
    height: 100%;
    min-height: 60rem;
`;

const Stage = styled.div`
    width: 100%;
    height: 100%;
    overflow-y: scroll;

    &::-webkit-scrollbar {
        display: none;
    }
`;

interface TemplateProps {
    title?: string;
}

export const Template: React.FC<TemplateProps> = ({ title, children }) => {
    return (
        <Site>
            {title && (
                <Head>
                    <title>{title}</title>
                    <meta name="title" content={title} />
                    <meta name="description" content={process.env.NEXT_PUBLIC_META_TAGS_DESC} />

                    <meta property="og:type" content="website" />
                    <meta property="og:url" content={process.env.NEXT_PUBLIC_META_TAGS_URL} />
                    <meta property="og:title" content={process.env.NEXT_PUBLIC_META_TAGS_TITLE} />
                    <meta property="og:description" content={process.env.NEXT_PUBLIC_META_TAGS_DESC} />
                </Head>
            )}
            <Stage>{children}</Stage>
        </Site>
    );
};
