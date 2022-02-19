import { ApolloProvider } from "@apollo/client";
import React from "react";
import ReactDOM from "react-dom";
import { ThemeProvider } from "styled-components";
import App from "./App";
import { GlobalStyles } from "./styles/styled.global";
import { lightTheme, darkTheme } from "./styles/themes";
import { client } from "./utils/client";
import { RecoilRoot } from "recoil";

ReactDOM.render(
  <React.StrictMode>
    <RecoilRoot>
      <ApolloProvider client={client}>
        <ThemeProvider theme={lightTheme}>
          <App />
        </ThemeProvider>
      </ApolloProvider>
      <GlobalStyles />
    </RecoilRoot>
  </React.StrictMode>,
  document.getElementById("root")
);
