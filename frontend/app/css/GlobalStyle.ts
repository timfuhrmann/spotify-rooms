import { createGlobalStyle } from "styled-components";
import { reset } from "./reset";
import { darkVariables, lightVariables } from "./variables";

export const GlobalStyle = createGlobalStyle`
    ${reset};

    :root {
        ${darkVariables};
    }

    .light-theme {
        :root {
            ${lightVariables};
        }
    }
    
    body {
        font-family: "Circular Std", Helvetica, Arial, sans-serif;
        color: ${p => p.theme.text};
        background-color: ${p => p.theme.body};
        -webkit-tap-highlight-color: transparent;
        overflow-wrap: break-word;
        word-break: break-word;
    }

    ::selection {
        background: ${p => p.theme.primary};
    }
`;
