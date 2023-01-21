import { useState, useContext, useEffect } from "react";
import {
  Card,
  CardContent,
  CardMedia,
  CardHeader,
  Typography,
  Box,
  IconButton,
  TextField,
  MenuItem,
  Grid,
  CardActions,
} from "@mui/material";

import EditIcon from "@mui/icons-material/Edit";
import CancelIcon from "@mui/icons-material/Cancel";
import { styled } from "@mui/material/styles";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import ViewListIcon from "@mui/icons-material/ViewList";
import LeaderboardIcon from "@mui/icons-material/Leaderboard";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import axios from "axios";
import Collapse from "@mui/material/Collapse";
import * as React from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ProducrInOrder from "../profile/ProductsInOrder";
import toast, { Toaster } from "react-hot-toast";

const StyledH1 = styled("h1")({
  textAlign: "center",
});
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

const StyledTextField = styled(TextField)(({ theme, order_status }) => {
  let color;
  if (order_status === "Deliverd") {
    color = theme.palette.success.light;
    console.log(color);
  } else if (order_status === "In Progress") {
    color = theme.palette.info.light;
  } else {
    color = theme.palette.error.light;
  }
  return { color };
});

const Order = (props) => {
  const [order, setOrder] = useState(props.order);
  const [expanded, setExpanded] = React.useState(false);
  const [orderStatus, setOrderStatus] = useState(props.order.order_status);
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

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
    // Save the new user in mongo (with the firebase id)
    fetch("http://localhost:3001/updateOrder", requestOptions)
      .then((response) => {
        console.log(response);
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
            <Typography variant="h6" component="h2">
              Order #{order._id}{" "}
            </Typography>
            <Typography color="textSecondary">
              Ordered on {order.created_at}
            </Typography>
          </Grid>
          <Grid item xs={2}>
            <StyledTextField
              value={orderStatus}
              onChange={handleOrderStatusChange}
              order_status={orderStatus}
              variant="filled"
              disabled={props.specificUser}
              select
              label="order status"
              defaultValue={order.order_status}
              fullWidth
            >
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
            <Typography variant="body2">Name: {props.customer.name}</Typography>
          </Grid>
          <Grid item xs={2}>
            <Typography variant="body2">
              Phone number: {props.customer.phone_number}
            </Typography>
          </Grid>
          <Grid item xs={2}>
            <Typography variant="body2">City: {props.customer.city}</Typography>
          </Grid>
          <Grid item xs={3}>
            <Typography variant="body2">
              Address : {props.customer.address_line}
            </Typography>
          </Grid>
          <Grid item xs={3}>
            <Typography variant="body2">
              Comment: {props.customer.comment}
            </Typography>
          </Grid>
        </Grid>

        <Collapse
          in={expanded}
          timeout="auto"
          unmountOnExit
          sx={{ minWidth: "100%" }}
        >
          <CardContent>
            {/* TODO: add component that show products */}
            <ProducrInOrder products={order.products}></ProducrInOrder>
          </CardContent>
        </Collapse>
      </Grid>
    </Box>
  );
};

export default Order;
