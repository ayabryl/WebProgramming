import { useState, useEffect, useContext, Fragment } from "react";
import { Grid, TablePagination } from "@mui/material";

import axios from "axios";

import ProductCard from "../Home/ProductCard";
import SearchContext from "../../contexts/SearchContext";
import SearchBar from "../Layout/SearchBar";
import TablePaginationActions from "../Layout/TablePaginationAction";
import useWebSocket from 'react-use-websocket';
import { LoginContext } from "../../contexts/LoginContext";

const AdminAllProducts = () => {
  const [products, setProducts] = useState([]);
  const [parsedProduct, setParsedProducts] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(12);
  const { searchWord } = useContext(SearchContext);

  const WS_URL = 'ws://127.0.0.1:3001';
  const loggedUserContext = useContext(LoginContext);


  const fetchData = () => {
    axios.get(`http://localhost:3001/products`).then((res) => {
      const data = res.data;
      setProducts(data);
    });
  };

  useWebSocket(WS_URL + '?userId=' + loggedUserContext.uid + '&isAdmin=' + loggedUserContext.isAdmin, {
    onOpen: () => {
      console.log('WebSocket connection established.');
    },
    onMessage: (message) => {
      fetchData();
    },
  })
 

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

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

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
          {rowsPerPage > 0
            ? parsedProduct.slice(
                page * rowsPerPage,
                page * rowsPerPage + rowsPerPage
              )
            : parsedProduct}
        </Grid>
      </Grid>
      <Grid
        width="98%"
        alignItems="center"
        display="flex"
        justifyContent="center"
        sx={{ position: "relative", bottom: 0 }}
      >
        <TablePagination
          rowsPerPageOptions={[12, 16, 32, { label: "All", value: -1 }]}
          colSpan={3}
          count={parsedProduct.length}
          rowsPerPage={rowsPerPage}
          page={page}
          SelectProps={{
            inputProps: {
              "aria-label": "products per page",
            },
            native: true,
          }}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          ActionsComponent={TablePaginationActions}
        />
      </Grid>
    </Fragment>
  );
};
export default AdminAllProducts;
