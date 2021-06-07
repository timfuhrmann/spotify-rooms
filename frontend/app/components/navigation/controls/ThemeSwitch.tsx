import React from "react";
import styled from "styled-components";
import { useCustomTheme } from "../../../context/theme/CustomThemeProvider";
import { Moon } from "../../../icons/Moon";
import { Sun } from "../../../icons/Sun";

const SwitchButton = styled.button`
    display: flex;
`;

const MoonIcon = styled(Moon)`
    width: 2.2rem;
    height: 2.2rem;
`;

const SunIcon = styled(Sun)`
    width: 2.2rem;
    height: 2.2rem;
`;

export const ThemeSwitch: React.FC = () => {
    const { theme, toggleTheme } = useCustomTheme();

    return <SwitchButton onClick={toggleTheme}>{"dark" === theme ? <MoonIcon /> : <SunIcon />}</SwitchButton>;
};
