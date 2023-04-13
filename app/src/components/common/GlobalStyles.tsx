import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
    body {
        font-family: 'Open Sans', 'Helvetica Neue', sans-serif;
        
        display: flex;
        flex-direction: column;
        align-items: center;
        margin: 0;
        padding: 0;

        position: relative;
        width: 100vw;
        height: 100vh;

        background: #2b2b2b
    }
`;
