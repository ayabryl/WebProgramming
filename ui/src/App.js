import { useState } from "react";

import { Routes, Route } from "react-router-dom";

import AuthPage from "./pages/AuthPage";
import Layout from "./components/Layout/Layout";
import HomePage from "./pages/HomePage";
import Cart from "./pages/Cart";
import ProfilePage from "./pages/ProfilePage";
import ProductPage from "./pages/ProductPage";
import AdminPage from "./pages/AdminPage";
import { LoginProvider } from "./contexts/LoginContext";
import SearchContext from "./contexts/SearchContext";

function App() {
  // return <AuthPage />;
  const [searchWord, setSearchWord] = useState("");

  return (
    <LoginProvider>
      <SearchContext.Provider value={{ searchWord, setSearchWord }}>
        <Layout>
          <Routes>
            <Route path="/" exact element={<HomePage />}></Route>
            <Route path="/auth" exact element={<AuthPage />}></Route>
            <Route path="/profile" exact element={<ProfilePage />}></Route>
            <Route path="/cart" exact element={<Cart />}></Route>
            <Route path="/product" exact element={<ProductPage />}></Route>
            <Route path="/admin" exact element={<AdminPage />}></Route>
          </Routes>
        </Layout>
      </SearchContext.Provider>
    </LoginProvider>
  );
}

export default App;
