import styled from "styled-components";

export const Input = styled.input`
    width: 100%;
    color: ${p => p.theme.white};
    padding: 0.75rem 0;
    background: none;
    border: none;
    font-size: 3rem;

    border-bottom: 0.1rem solid ${p => p.theme.borderColor};

    ::placeholder {
        color: ${p => p.theme.borderColor};
    }

    &:focus {
        border-color: ${p => p.theme.white};
    }
`;
