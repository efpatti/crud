import { createGlobalStyle } from "styled-components";

const Global = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
  }

  body {
    width: 100vw;
    height: 100vh;
    justify-content: center;
    display: flex;
    background-color: #f2f2f2;
  }

`;

export default Global;
