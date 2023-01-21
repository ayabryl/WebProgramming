import { useState, useEffect, useContext, Fragment } from "react";
import { Grid } from "@mui/material";

import { Toaster } from "react-hot-toast";
import axios from "axios";

import ProductCard from "../Home/ProductCard";
import SearchContext from "../../contexts/SearchContext";
import SearchBar from "../Layout/SearchBar";
import { StyledButtonContained, theme } from "../../theme";

const AdminAllProducts = () => {
  const [products, setProducts] = useState([]);
  const [parsedProduct, setParsedProducts] = useState([]);
  const { searchWord } = useContext(SearchContext);

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
      <Grid item xs={3}>
        <ProductCard
          key={Math.random().toString()}
          product={p}
          adminPage={true}
        ></ProductCard>
      </Grid>
    ));
    setParsedProducts(productsShow);
  }, [searchWord, products]);

  return (
    <Fragment>
      <Grid
        sx={{ mt: 3 }}
        display="flex"
        alignItems="center"
        direction="column"
      >
        <Grid item>
          <SearchBar />
        </Grid>
        <Grid container spacing={4} sx={{ p: 3 }}>
          {parsedProduct}
        </Grid>
      </Grid>
    </Fragment>
  );
};
export default AdminAllProducts;
