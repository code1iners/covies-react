import { DefaultTheme } from "styled-components";
import themesCommonColors from "./themes.commonColors";
import themesGradients from "./themes.gradients";

export const commonColors = { ...themesCommonColors };

export const gradients = { ...themesGradients };

export const lightTheme: DefaultTheme = {
  colors: { ...commonColors },
};

export const darkTheme: DefaultTheme = {
  colors: { ...commonColors },
};

export default {
  commonColors,
  gradients,
  lightTheme,
  darkTheme,
};
