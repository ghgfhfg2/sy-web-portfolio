import * as React from "react";
import { ChakraProvider } from "@chakra-ui/react";
import * as ReactDOM from "react-dom/client";
import App from "./App";
import { Reset } from "styled-reset";
import { createGlobalStyle } from "styled-components";
import "pretendard/dist/web/static/pretendard.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Admin from "./component/Admin";

const GlobalStyle = createGlobalStyle`


body{
  font-family: 'Pretendard';
}
`;

const rootElement = document.getElementById("root");
ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <Reset />
      <ChakraProvider>
        <GlobalStyle />
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </ChakraProvider>
    </BrowserRouter>
  </React.StrictMode>
);
