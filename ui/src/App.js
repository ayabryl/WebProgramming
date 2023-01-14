import { useContext, useState } from "react";

import { Routes, Route } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";

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
  primary: {
    main: "#7555a7",
  },
  secondary: {
    main: "#50b47a",
  },
  error: {
    main: "#ffccbc",
  },
  warning: {
    main: "#bdbdbd",
  },
  info: {
    main: "#5870cb",
  },
  success: {
    main: "#c6f68d",
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
