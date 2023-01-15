import { useContext, useState } from "react";

import { Routes, Route } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Button } from "@mui/material";

import AuthPage from "./pages/AuthPage";
import Layout from "./components/Layout/Layout";
import HomePage from "./pages/HomePage";
import CartPage from "./pages/Cart";
import ProfilePage from "./pages/ProfilePage";
import ProductPage from "./pages/ProductPage";
import AdminPage from "./pages/AdminPage";
import { LoginProvider } from "./contexts/LoginContext";
import SearchContext from "./contexts/SearchContext";
import { CartContextProvider } from "./contexts/CartContext";

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

function App() {
  //console.log(useContext(CartContext))
  // return <AuthPage />;
  const [searchWord, setSearchWord] = useState("");
  //const [cart, setCart] = useState();

  return (
    <ThemeProvider theme={theme}>
      <LoginProvider>
        <CartContextProvider>
          <SearchContext.Provider value={{ searchWord, setSearchWord }}>
            <Layout>
              <Routes>
                <Route path="/" exact element={<HomePage />}></Route>
                <Route path="/auth" exact element={<AuthPage />}></Route>
                <Route path="/profile" exact element={<ProfilePage />}></Route>
                <Route path="/cart" exact element={<CartPage />}></Route>
                <Route path="/product" exact element={<ProductPage />}></Route>
                <Route path="/admin" exact element={<AdminPage />}></Route>
              </Routes>
            </Layout>
          </SearchContext.Provider>
        </CartContextProvider>
      </LoginProvider>
    </ThemeProvider>
  );
}

export default App;
