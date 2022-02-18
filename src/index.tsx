import { ApolloProvider } from "@apollo/client";
import React from "react";
import ReactDOM from "react-dom";
import { ThemeProvider } from "styled-components";
import App from "./App";
import { GlobalStyles } from "./styles/styled.global";
import { lightTheme, darkTheme } from "./styles/theme";
import { client } from "./utils/client";

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <ThemeProvider theme={lightTheme}>
        <App />
      </ThemeProvider>
    </ApolloProvider>
    <GlobalStyles />
  </React.StrictMode>,
  document.getElementById("root")
);
