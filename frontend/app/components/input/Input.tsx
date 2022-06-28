import React from "react";
import styled from "styled-components";

const InputFrame = styled.input`
    width: 100%;
    color: ${p => p.theme.text};
    padding: 0.75rem 0;
    background: none;
    border: none;
    font-size: 3rem;
    border-bottom: 0.1rem solid ${p => p.theme.borderColor};

    ::placeholder {
        color: ${p => p.theme.text};
    }

    &:focus {
        border-color: ${p => p.theme.white};
    }
`;

type HTMLInputProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, "value" | "onInput">;

interface InputProps extends HTMLInputProps {
    value: string;
    onInput: (value: string) => void;
}

export const Input: React.FC<InputProps> = ({ value, onInput, ...props }) => {
    return <InputFrame value={value} onInput={e => onInput((e.target as HTMLInputElement).value)} {...props} />;
};
