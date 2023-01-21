import { createTheme, responsiveFontSizes } from "@mui/material/styles";
import * as React from "react";
import { styled } from "@mui/system";
import { Button, TextField } from "@mui/material";

const theme = createTheme({
  typography: {
    fontFamily: "sans-serif",
    button: {
      fontStyle: "sans-serif",
    },
  },
  palette: {
    primary: {
      light: "#a29f92",
      main: "#1a1916",
      dark: "#8e70ad",
      200: "#90caf9",
      800: "#1565c0",
      contrastText: "#fff",
    },
    secondary: {
      light: "#9f9b99",
      main: "#817c86",
      dark: "#651fff",
      200: "#b39ddb",
      800: "#6200ea",
    },
    error: {
      light: "#ef9a9a",
      main: "#f44336",
      dark: "#c62828",
    },
    orange: {
      light: "#fbe9e7",
      main: "#ffab91",
      dark: "#d84315",
      yellow: "#FAF8D0"
    },
    warning: {
      light: "#fff8e1",
      main: "#ffe57f",
      dark: "#ffc107",
    },
    success: {
      light: "#b9f6ca",
      200: "#69f0ae",
      main: "#00e676",
      dark: "#00c853",
    },
    grey: {
      50: "#fafafa",
      100: "#f5f5f5",
      500: "#8492c4",
    },
    info: {
      light: "#F0F8FF",
      main: "#F0F8FF",
    },
    dark: {
      light: "#bdc8f0",
      main: "#29314f",
      dark: "#212946",
      800: "#1a223f",
      900: "#111936",
    },
    text: {
      primary: "#383734",
      secondary: "#817c86",
      hint: "#C8F4F9",
    },
  },
});

export const StyledButtonContained = styled(Button)(
  ({ theme, color = "secondary" }) => ({
    ":hover": {
      color: "white",
      backgroundColor: theme.palette[color].light,
    },
    "background-color": theme.palette[color].main,
    color: "white",
  })
);

// export const StyledTextField = styled(TextField)(({ theme }) => ({
//   color: theme.palette.primary.light,
//   ":hover": {
//     color: theme.palette.primary.light,
//   },
// }));

export default theme;
