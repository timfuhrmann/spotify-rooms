import React from "react";
import styled from "styled-components";

const Site = styled.div`
    position: absolute;
    width: 100%;
    height: 100%;
`;

const Stage = styled.div`
    width: 100%;
    height: 100%;
    overflow-y: scroll;
`;

export const Template: React.FC = ({ children }) => {
    return (
        <Site>
            <Stage>{children}</Stage>
        </Site>
    );
};
