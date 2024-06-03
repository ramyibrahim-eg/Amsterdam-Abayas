import { createGlobalStyle } from "styled-components";
import ExpoArabicBook from "./GE_Hili_Book.otf";

const GlobalStyles = createGlobalStyle`
  @font-face {
    font-family: 'GE Hili';
    src: url(${ExpoArabicBook}) format('truetype');
    font-weight: normal;
    font-style: normal;
  }

  body {
    font-family: 'GE Hili', sans-serif;
  }
`;

export default GlobalStyles;
