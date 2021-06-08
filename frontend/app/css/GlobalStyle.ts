import { createGlobalStyle } from "styled-components";
import { reset } from "./reset";

export const GlobalStyle = createGlobalStyle`
    ${reset};
    
    body {
        font-family: "Circular Std", Helvetica, Arial, sans-serif;
        color: ${p => p.theme.text};
        background-color: ${p => p.theme.body};
        word-break: break-word;
        hyphens: auto;
    }

    ::selection {
      background: ${p => p.theme.primary};
    }
`;
