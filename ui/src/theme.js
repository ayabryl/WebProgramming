import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme({
  typography: {
    fontFamily: [
      "Nunito",
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
    ].join(","),
  },
  palette: {
    primary: {
      light: "#e3f2fd",
      main: "#2F7977",
      dark: "#1e88e5",
      200: "#90caf9",
      800: "#1565c0",
    },
    secondary: {
      light: "#d1c4e9",
      main: "#90BBC2",
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
    dark: {
      light: "#bdc8f0",
      main: "#29314f",
      dark: "#212946",
      800: "#1a223f",
      900: "#111936",
    },
    text: {
      primary: "#212121",
      secondary: "#90BBC2",
      hint: "#C8F4F9",
    },

    typography: {
      subtitle1: {
        fontSize: 12,
      },
      body1: {
        fontWeight: 500,
      },
      button: {
        fontStyle: "sans-serif",
      },
    },
    fontfamily: {
      fontStyle: "sans-serif",
    },
  },
});

export default theme;
