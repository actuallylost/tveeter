import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
    body, #root {
        font-family: 'Open Sans', 'Helvetica Neue', sans-serif;
        
        display: flex;
        flex-direction: column;
        align-items: center;

		margin: 0;

        width: 100vw;
        height: 100vh;

        background: #2b2b2b;
		color: white;
    }
`;
