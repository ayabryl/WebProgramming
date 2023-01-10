import React from "react";
import ProductCard from "./ProductCard";
import { useState, useEffect, useContext } from "react";
import { Grid, Typography, Button } from "@mui/material";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import SearchContext from "../../contexts/SearchContext";

const Market = () => {
  const [products, setProducts] = useState([]);
  const [parsedProduct, setParsedProducts] = useState([]);
  const { searchWord } = useContext(SearchContext);
  const navigate = useNavigate();

  const toProductPage = (product) => {
    navigate("/product", { state: { product: product } });
  };

  const fetchData = () => {
    axios.get(`http://localhost:3001/products`).then((res) => {
      const data = res.data;
      setProducts(data);
    });
  };

  useEffect(() => {
    console.log("Fetching data...");
    fetchData();
  }, []);

  useEffect(() => {
    let productsShow = products;
    if (searchWord !== "") {
      productsShow = products.filter(
        (pro) =>
          pro.name.includes(searchWord) ||
          pro.category.includes(searchWord) ||
          pro.description.includes(searchWord)
      );
    }
    productsShow = productsShow.map((p) => (
      <Grid
        item
        xs={3}
        onClick={() => {
          toProductPage(p);
        }}
      >
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
    setParsedProducts(productsShow);
  }, [searchWord, products]);

  return (
    <React.Fragment>
      <Toaster position="top-center" reverseOrder={false} />
      <Grid sx={{ mt: 3 }}>
        <Grid container spacing={4} sx={{ p: 3 }}>
          {parsedProduct}
        </Grid>
      </Grid>
    </React.Fragment>
  );
};
export default Market;
