import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    body {
        background-color: rgba(0, 0, 0, 1);
        color: white;
    }

    a {
        text-decoration: none;
        color: inherit;
    }
`;
