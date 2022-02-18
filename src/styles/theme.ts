import { DefaultTheme } from "styled-components";

export const commonColors = {
  sexyRed: "rgba(247, 48, 56, 1)",
  textColor: "white",
  backgroundColor: "#141414",

  headers: {
    backgroundColor: "rgba(0, 0, 0, 1)",
    textColor: "white",
  },
};

export const lightTheme: DefaultTheme = {
  colors: {
    ...commonColors,
  },
};

export const darkTheme: DefaultTheme = {
  colors: {
    ...commonColors,
  },
};
