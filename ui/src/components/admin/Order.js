import { useState, useEffect } from "react";
import {
  CardContent,
  Typography,
  Box,
  IconButton,
  TextField,
  MenuItem,
  Grid,
  CardActions,
  Collapse,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import toast, { Toaster } from "react-hot-toast";
import axios from "axios";

import ProducrInOrder from "../profile/ProductsInOrder";
import theme from "../../theme";

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

const StyledTextField = styled(TextField)(({ theme, colorOrder }) => ({
  "background-color": colorOrder(),
  "border-color": colorOrder(),
  color: "black",
}));

const Order = (props) => {
  const [order, setOrder] = useState(props.order);
  const [expanded, setExpanded] = useState(false);
  const [orderStatus, setOrderStatus] = useState(props.order.order_status);
  const [customer, setCustomer] = useState([]);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  useEffect(() => {
    setOrderStatus(props.order.order_status)
  },[props.order.order_status])

  const colorOrder = () => {
    let color;
    if (orderStatus === "Deliverd") {
      color = theme.palette.success.light;
      // border-color = theme.palette.success.light;
    } else if (orderStatus === "New Order") {
      color = theme.palette.orange.yellow;
    } else if (orderStatus === "In Progress") {
      color = theme.palette.info.light;
    } else {
      color = theme.palette.orange.light;
    }
    return color;
  };

  useEffect(() => {
    if (!props.specificUser) {
      axios.get(`http://localhost:3001/users/${order.user_id}`).then((res) => {
        setCustomer(res.data);
      });
    } else {
      setCustomer(props.customer);
    }
  });

  const handleOrderStatusChange = (event) => {
    const body = {
      _id: order._id,
      order_status: event.target.value,
      created_at: order.data,
      products: order.products,
      user_id: order.user_id,
    };
    const requestOptions = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    };
    fetch("http://localhost:3001/updateOrder", requestOptions)
      .then((response) => {
        setOrder({ ...order, order_status: event.target.value });
        setOrderStatus(event.target.value);
      })
      .catch((error) => {
        console.log(error);
        toast.error("Error Occured, Try again");
      });
  };

  return (
    <Box
      sx={{
        width: "70%",
        display: "flex",
        boxShadow: 1,
        borderRadius: 2,
        justifyContent: "center",
      }}
    >
      <Toaster position="top-center" reverseOrder={false} />
      <Grid
        container
        rowSpacing={1}
        direction="column"
        justifyContent="flex-start"
        alignItems="start"
        sx={{ m: 2 }}
      >
        <Grid
          container
          direction="row"
          display="flex"
          justifyContent="space-between"
        >
          <Grid item xs={8}>
            <Typography
              variant="h6"
              component="h2"
              sx={{
                color: "primary.dark",
                fontWeight: "bold",
                mt: 1,
              }}
            >
              Order #{order._id}{" "}
            </Typography>
            <Typography color="textSecondary">
              Ordered on {order.created_at}
            </Typography>
          </Grid>
          <Grid item xs={2}>
            <StyledTextField
              colorOrder={colorOrder}
              value={orderStatus}
              onChange={handleOrderStatusChange}
              variant="outlined"
              disabled={props.specificUser}
              select
              size="small"
              label="order status"
              fullWidth
            >
              <MenuItem value="New Order">New Order</MenuItem>
              <MenuItem value="In Progress">In Progress</MenuItem>
              <MenuItem value="Deliverd">Deliverd</MenuItem>
              <MenuItem value="Cancelled">Cancelled</MenuItem>
            </StyledTextField>
          </Grid>
          <Grid item xs={1}>
            <CardActions>
              <ExpandMore
                expand={expanded}
                onClick={handleExpandClick}
                aria-expanded={expanded}
                aria-label="show more"
              >
                <ExpandMoreIcon />
              </ExpandMore>
            </CardActions>
          </Grid>
        </Grid>
        <Grid
          container
          direction="row"
          justifyContent="space-between"
          alignItems="flex-start"
          sx={{ m: 2 }}
        >
          <Grid item xs={2}>
            <Typography variant="body2">Name: {customer.name}</Typography>
          </Grid>
          <Grid item xs={3}>
            <Typography variant="body2">
              Phone number: {customer.phone_number}
            </Typography>
          </Grid>
          <Grid item xs={2}>
            <Typography variant="body2">City: {customer.city}</Typography>
          </Grid>
          <Grid item xs={3}>
            <Typography variant="body2">
              Address : {customer.address_line}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="body2">Comment: {customer.comment}</Typography>
          </Grid>
        </Grid>

        <Collapse
          in={expanded}
          timeout="auto"
          unmountOnExit
          sx={{ minWidth: "100%" }}
        >
          <CardContent>
            <ProducrInOrder products={order.products}></ProducrInOrder>
          </CardContent>
        </Collapse>
      </Grid>
    </Box>
  );
};

export default Order;
