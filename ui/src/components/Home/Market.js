import React from "react";
import ProductCard from "./ProductCard";
import { useState, useEffect } from "react";
import { Grid, Typography, Button } from "@mui/material";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate} from "react-router-dom";

const Market = () => {
  const [products, setProducts] = useState([]);
  // const [shoppingList, setShoppingList] = useState([]);
  // const [showShoppingList, setShowShoppingList] = useState(false);
  // const [buttonText, setButtonText] = useState("Go to Cart");
  // const [products, setProducts] = useState([]);

  // const handleAddToCartClick = (newProduct) => {
  //   setShoppingList((prevList) => {
  //     return [newProduct, ...prevList];
  //   });
  // };

  const navigate = useNavigate();

  const toProductPage = (product) => {
    navigate('/product', { state: {product :product}});
  }


  const fetchData = () => {
    axios.get(`http://localhost:3001/products`)
      .then(res => {
        const data = res.data;
        setProducts(data);
      })
  };

  useEffect(() => {
    console.log("Fetching data...");
    fetchData();
  }, []);


  const productsShow = products.map((p) => (
    <Grid item xs={3} onClick={()=>{toProductPage(p)}}>
      <ProductCard
        key={Math.random().toString()}
        name={p.name}
        category={p.category}
        description={p.description}
        price={p.price}
        imageURL={p.image_link}
        id={p.id}
      ></ProductCard>
    </Grid>
  ));

  // const handleCartButtonClick = () => {
  //   setButtonText(showShoppingList ? "Go to cart" : "Back to supermarket");
  //   setShowShoppingList(!showShoppingList);
  // };

  // const fetchProducts = () => {
  //   fetch("http://localhost:3001/products")
  //     .then((Response) => {
  //       Response.json().then((data) => setProducts(data));
  //     })
  //     .catch((err) => console.log(err));
  // };

  // useEffect(() => {
  //   fetchProducts();
  // }, []);

  // const resetShoppingList = () => {n
  //   setShoppingList([]);
  //   handleCartButtonClick();
  //   toast.success("Oreder Completed Successfully ");
  // };
  return (
    <React.Fragment>
      <Toaster position="top-center" reverseOrder={false} />
      <Grid sx={{ mt: 3 }}>
        <Grid container spacing={4} sx={{ p: 3 }}>
          {productsShow}
        </Grid>
      </Grid>
    </React.Fragment>
  );
};
export default Market;
