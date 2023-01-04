import Grid from "@mui/material/Grid";
import Product from "../components/Product/Product";
import { useLocation, useNavigate } from "react-router-dom";

const ProductPage = () => {

  const location = useLocation();
  const navigate = useNavigate();

  const AddToCart = () => {
    console.log("add product" + location.state.product.name + "to cart");
    navigate('/cart');
  }
  return (

    <Product style={{ height: '100vh', width: '100vh' }} 
    handleAddToCart={AddToCart}
    makeUpProduct={location.state.product}></Product>
  );
};

export default ProductPage;