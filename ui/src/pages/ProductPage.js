import Grid from "@mui/material/Grid";
import Product from "../components/Product/Product";
import { useLocation, useNavigate } from "react-router-dom";
import { CartContext } from "../contexts/CartContext";
import { useContext, useState } from "react";

const ProductPage = () => {

  const location = useLocation();
  const navigate = useNavigate();
  const { cart, removeFromCart, addToCart } = useContext(CartContext);

  const AddProductToCart = (chosenColor, amount) => {
    console.log("add product" + location.state.product.name + "to cart");
    const newProduct =  {...location.state.product, amount: amount}
    newProduct.product_colors = newProduct.product_colors.filter((color) => color.hex_value === chosenColor.hex_value)
    addToCart(newProduct)
    navigate('/cart');
  }
  return (
    <Product style={{ height: '100vh', width: '100vh' }}
      handleAddToCart={AddProductToCart}
      makeUpProduct={location.state.product}></Product>
  );
};

export default ProductPage;