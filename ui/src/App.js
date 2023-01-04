import { Routes, Route } from "react-router-dom";
import AuthPage from "./pages/AuthPage";
import Layout from "./components/Layout/Layout";
import HomePage from "./pages/HomePage";
import Cart from "./pages/Cart";
import ProfilePage from "./pages/ProfilePage";
import ProductPage from "./pages/ProductPage";

function App() {
  // return <AuthPage />;
  return (
    <Layout>
      <Routes>
        <Route path="/" exact element={<HomePage />}></Route>
        <Route path="/auth" exact element={<AuthPage />}></Route>
        <Route path="/profile" exact element={<ProfilePage />}></Route>
        <Route path="/cart" exact element={<Cart />}></Route>
        <Route path="/product" exact element={<ProductPage />}></Route>
      </Routes>
    </Layout>
  );
}

export default App;
