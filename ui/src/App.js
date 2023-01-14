import { useContext, useState } from "react";

import { Routes, Route } from "react-router-dom";

import AuthPage from "./pages/AuthPage";
import Layout from "./components/Layout/Layout";
import HomePage from "./pages/HomePage";
import CartPage from "./pages/Cart";
import ProfilePage from "./pages/ProfilePage";
import ProductPage from "./pages/ProductPage";
import AdminPage from "./pages/AdminPage";
import { LoginProvider } from "./contexts/LoginContext";
import SearchContext from "./contexts/SearchContext";
import {CartContextProvider} from "./contexts/CartContext"

function App() {
  //console.log(useContext(CartContext))
  // return <AuthPage />;
  const [searchWord, setSearchWord] = useState("");
  //const [cart, setCart] = useState();

  return (
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
  );
}

export default App;
