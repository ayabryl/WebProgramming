import { useState, useEffect, useContext } from "react";
import React from "react";
import { Grid } from "@mui/material";

import { styled } from "@mui/material/styles";
import Order from "./Order";
import axios from "axios";

import toast, { Toaster } from "react-hot-toast";
import { LoginContext } from "../../contexts/LoginContext";

const StyledH1 = styled("h1")({
  textAlign: "center",
});

const Orders = (props) => {
  const [orders, setOrders] = useState([]);
  const loggedUserContext = useContext(LoginContext);

  const fetchOrdersData = () => {
    const url = props.specificUser
      ? "http://localhost:3001/orders/" + loggedUserContext.uid
      : "http://localhost:3001/orders";
    axios.get(url).then((res) => {
      const data = res.data;
      setOrders(data);
    });
  };

  useEffect(() => {
    console.log("Fetching data...");
    // fetchOrdersData();
    console.log(orders);
    setOrders([
      {
        order_status: "Deliverd",
        created_at: new Date().toUTCString(),
        products: [],
        user_id:
          "Q.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vc2hvcGF1dGhyZWFj",
      },
    ]);
  }, []);

  const ordersShow = orders.map((order) => (
    <Grid item xs={3}>
      <Order order={order}></Order>
    </Grid>
  ));

  return (
    <React.Fragment>
      <Toaster position="top-center" reverseOrder={false} />
      <Grid>
        <Grid container spacing={4} sx={{ p: 1 }}>
          {ordersShow}
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default Orders;
