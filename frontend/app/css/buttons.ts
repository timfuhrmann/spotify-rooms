import styled from "styled-components";

export const Button = styled.button`
    padding: 1.25rem 2rem;
    font-weight: bold;
    font-size: 2rem;
    border-radius: ${p => p.theme.radius};
`;

export const ButtonSpotify = styled(Button)`
    display: flex;
    align-items: center;
    background-color: ${p => ("dark" === p.theme.type ? p.theme.primary : p.theme.white)};
    color: ${p => ("dark" === p.theme.type ? p.theme.white : p.theme.black)};
    transition: color 0.2s, background-color 0.2s;

    @media (hover: hover) {
        &:hover {
            background-color: ${p => ("dark" === p.theme.type ? p.theme.white : p.theme.primary)};
            color: ${p => ("dark" === p.theme.type ? p.theme.black : p.theme.white)};
        }
    }
`;
