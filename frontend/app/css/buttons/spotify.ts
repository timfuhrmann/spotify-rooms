import styled from "styled-components";
import { Button } from "./button";

export const ButtonSpotify = styled(Button)`
    display: flex;
    align-items: center;
    background-color: ${p => ("dark" === p.theme.type ? p.theme.green : p.theme.white)};
    color: ${p => ("dark" === p.theme.type ? p.theme.white : p.theme.black)};
    transition: color 0.2s, background-color 0.2s;

    @media (hover: hover) {
        &:hover {
            background-color: ${p => ("dark" === p.theme.type ? p.theme.white : p.theme.green)};
            color: ${p => ("dark" === p.theme.type ? p.theme.black : p.theme.white)};
        }
    }
`;
