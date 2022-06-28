import React from "react";
import styled from "styled-components";
import { useCustomTheme } from "@lib/context/theme";
import { Moon } from "@icons/Moon";
import { Sun } from "@icons/Sun";

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

export const NavigationTheme: React.FC = () => {
    const { theme, toggleTheme } = useCustomTheme();

    return <SwitchButton onClick={toggleTheme}>{"light" === theme ? <SunIcon /> : <MoonIcon />}</SwitchButton>;
};
