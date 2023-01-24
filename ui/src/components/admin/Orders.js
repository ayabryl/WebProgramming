import { useState, useEffect, useContext } from "react";
import React from "react";
import { Grid } from "@mui/material";

import { styled } from "@mui/material/styles";
import Order from "./Order";
import axios from "axios";

import toast, { Toaster } from "react-hot-toast";
import { LoginContext } from "../../contexts/LoginContext";

const Orders = (props) => {
  const [orders, setOrders] = useState([]);
  const loggedUserContext = useContext(LoginContext);
  const [customer, setCustomer] = useState([]);

  const fetchOrdersData = () => {
    const url = props.specificUser
      ? "http://localhost:3001/orders/userId/" + loggedUserContext.uid
      : "http://localhost:3001/orders";
    axios.get(url).then((res) => {
      const data = res.data;
      setOrders(data);
    });
  };

  const fetchOrderCustomerData = (user_id) => {
    axios.get(`http://localhost:3001/users/${user_id}`).then((res) => {
      const data = res.data;
      setCustomer(data);
    });
  };

  useEffect(() => {
    console.log("Fetching data...");
    fetchOrdersData();
    fetchOrderCustomerData(loggedUserContext.uid);
  }, []);

  const ordersShow = orders.map((order) => (
    <Grid item xs={12} display="flex" justifyContent="center">
      <Order
        order={order}
        specificUser={props.specificUser}
        customer={customer}
      ></Order>
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
