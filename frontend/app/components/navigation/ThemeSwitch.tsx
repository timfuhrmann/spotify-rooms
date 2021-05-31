import React, { useRef } from "react";
import styled from "styled-components";
import { useCustomTheme } from "../../context/theme/CustomThemeProvider";

const Switch = styled.button`
    width: 8rem;
    height: 8rem;
`;

export const ThemeSwitch: React.FC = () => {
    const { toggleTheme } = useCustomTheme();
    const buttonRef = useRef<HTMLButtonElement>(null);

    return (
        <Switch
            ref={buttonRef}
            onClick={() => {
                toggleTheme();
            }}
        />
    );
};
