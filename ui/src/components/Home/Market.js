import * as React from "react";
import Product from "./Product";
import { useState, useEffect } from "react";
import { Typography, Grid, Button } from "@mui/material";
import toast, { Toaster } from "react-hot-toast";

const Market = () => {
  // const [shoppingList, setShoppingList] = useState([]);
  // const [showShoppingList, setShowShoppingList] = useState(false);
  // const [buttonText, setButtonText] = useState("Go to Cart");
  // const [products, setProducts] = useState([]);

  // const handleAddToCartClick = (newProduct) => {
  //   setShoppingList((prevList) => {
  //     return [newProduct, ...prevList];
  //   });
  // };

  const products = [
    {
      id: 1,
      price: 50,
      brand: "test",
      price_sign: "",
      product_link: "",
      description: "Shiney Gloss",
      category: "Gloss",
      product_type: "Gloss",
      image_link:
        "https://www.ofracosmetics.co.il/wp-content/uploads/2019/09/natural-lipgloss-1_540.jpg",
    },
    {
      id: 2,
      price: 50,
      brand: "test",
      price_sign: "",
      product_link: "",
      description: "Shiney Gloss",
      category: "Gloss",
      product_type: "Gloss",
      image_link:
        "https://www.ofracosmetics.co.il/wp-content/uploads/2019/09/natural-lipgloss-1_540.jpg",
    },
    {
      id: 3,
      price: 50,
      brand: "test",
      price_sign: "",
      product_link: "",
      description: "Shiney Gloss",
      category: "Gloss",
      product_type: "Gloss",
      image_link:
        "https://www.ofracosmetics.co.il/wp-content/uploads/2019/09/natural-lipgloss-1_540.jpg",
    },
    {
      id: 4,
      price: 50,
      brand: "test",
      price_sign: "",
      product_link: "",
      description: "Shiney Gloss",
      category: "Gloss",
      product_type: "Gloss",
      image_link:
        "https://www.ofracosmetics.co.il/wp-content/uploads/2019/09/natural-lipgloss-1_540.jpg",
    },
    {
      id: 5,
      price: 50,
      brand: "test",
      price_sign: "",
      product_link: "",
      description: "Shiney Gloss",
      category: "Gloss",
      product_type: "Gloss",
      image_link:
        "https://www.ofracosmetics.co.il/wp-content/uploads/2019/09/natural-lipgloss-1_540.jpg",
    },
  ];
  const productsShow = products.map((p) => (
    <Grid item xs={3}>
      <Product
        key={Math.random().toString()}
        name={p.category}
        description={p.description}
        price={p.price}
        imageURL={p.image_link}
        id={p.id}
      ></Product>
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
