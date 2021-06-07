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
                </Head>
            )}
            <Stage>{children}</Stage>
        </Site>
    );
};
