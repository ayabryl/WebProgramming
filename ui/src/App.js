import { Routes, Route } from "react-router-dom";

import AuthPage from "./pages/AuthPage";
import Layout from "./components/Layout/Layout";
import HomePage from "./pages/HomePage";
import Profile from "./pages/Profile";
import Cart from "./pages/Cart";

function App() {
  // return <AuthPage />;
  return (
    <Layout>
      <Routes>
        <Route path="/" exact element={<HomePage />}></Route>
        <Route path="/auth" exact element={<AuthPage />}></Route>
        <Route path="/profile" exact element={<Profile />}></Route>
        <Route path="/cart" exact element={<Cart />}></Route>
      </Routes>
    </Layout>
  );
}

export default App;
