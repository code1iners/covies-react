import { DefaultTheme } from "styled-components";

export const commonColors = {
  sexyRed: "rgba(247, 48, 56, 1)",
};

export const lightTheme: DefaultTheme = {
  colors: {
    ...commonColors,
    textColor: "black",
    backgroundColor: "white",

    headers: {
      backgroundColor: "rgba(10, 10, 10, 1)",
      textColor: "white",
    },
  },
};

export const darkTheme: DefaultTheme = {
  colors: {
    ...commonColors,
    textColor: "white",
    backgroundColor: "black",

    headers: {
      backgroundColor: "rgba(10, 10, 10, 1)",
      textColor: "white",
    },
  },
};
