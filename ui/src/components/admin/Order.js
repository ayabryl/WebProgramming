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

const Order = (props) => {
  const [order, setOrder] = useState(props.order);
  const [customer, setCustomer] = useState([]);
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const fetchOrderCustomerData = (user_id) => {
    axios.get(`http://localhost:3001/users/${user_id}`).then((res) => {
      const data = res.data;
      console.log(data);
      setCustomer(data);
    });
  };
  useEffect(() => {
    console.log("Fetching data...");
    fetchOrderCustomerData(order.user_id);
    // setCustomer({
    //   _id: "String",
    //   name: "String",
    //   phone_number: "String",
    //   city: "String",
    //   address_line: "String",
    //   is_admin: false,
    //   comment: "String",
    // });
  }, []);

  const handleOrderStatusChange = (event) => {
    const body = {
      order_status: event.target.value,
      created_at: order.data,
      products: order.products,
      user_id: order.user_id,
    };
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    };
    // Save the new user in mongo (with the firebase id)
    fetch("http://localhost:3001/updateOrder", requestOptions)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
        toast.error("Error Occured, Try again");
      });
  };

  return (
    // <Card
    //   sx={{
    //     display: "flex",
    //     height: "105%",
    //     width: "105%",
    //     boxShadow: 1,
    //     borderRadius: 2,
    //     justifyContent: "space-around",
    //   }}
    // >
    //   <Toaster position="top-center" reverseOrder={false} />
    //   <Box
    //     sx={{
    //       display: "flex",
    //       flexDirection: "column",
    //       justifyContent: "space-between",
    //       ml: 2,
    //     }}
    //   >
    //     <CardContent>
    //       <Typography variant="h5" component="h2">
    //         Order #{order._id}
    //       </Typography>
    //       <Typography color="textSecondary">
    //         Ordered on {order.created_at}
    //       </Typography>

    //       <Typography variant="body2">Name: {order.name}</Typography>
    //       <Typography variant="body2">
    //         Phone number: {order.phone_number}
    //       </Typography>
    //       <Typography variant="body2">City: {order.city}</Typography>
    //       <Typography variant="body2">
    //         address_line: {order.address_line}
    //       </Typography>
    //       <Typography variant="body2">Comment: {customer.comment}</Typography>

    //       <Typography variant="body2">
    //         Items:
    //         <ul>
    //           {order.products.map((item) => (
    //             <li key={item.name}>
    //               {item.name} ({item.product_type})
    //             </li>
    //           ))}
    //         </ul>
    //       </Typography>
    //     </CardContent>

    //     <Box
    //       sx={{
    //         display: "flex",
    //         flexDirection: "row",
    //         alignItems: "right",
    //         ml: 1,
    //         justifyContent: "space-around",
    //       }}
    //     >
    //       <TextField
    //         id="outlined-select-currency"
    //         select
    //         label="order status"
    //         defaultValue={order.order_status}
    //         fullWidth="80%"
    //         sx={{ mb: 2, mr: 2, ml: 2 }}
    //         onChange={handleOrderStatusChange}
    //       >
    //         <MenuItem key="Deliverd" value="Deliverd">
    //           Deliverd
    //         </MenuItem>
    //         <MenuItem key="In Progress" value="In Progress">
    //           In Progress
    //         </MenuItem>
    //         <MenuItem key="New order" value="New order">
    //           New order
    //         </MenuItem>
    //       </TextField>
    //     </Box>
    //   </Box>
    // </Card>
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
        alignItems="center"
        sx={{ mt: 2 }}
      >
        <Grid item>
          <Typography variant="h5" component="h2">
            Order #{order._id}{" "}
          </Typography>
        </Grid>
        <Grid item>
          <Typography color="textSecondary">
            Ordered on {order.created_at}
          </Typography>
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
          <Grid item xs={2}>
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
          <Grid item xs={3}>
            <Typography variant="body2">Comment: {customer.comment}</Typography>
          </Grid>
        </Grid>
        <TextField
          id="outlined-select-currency"
          select
          label="order status"
          defaultValue={order.order_status}
          width="40%"
          disabled={props.specificUser}
          onChange={handleOrderStatusChange}
        >
          <MenuItem key="Deliverd" value="Deliverd">
            Deliverd
          </MenuItem>
          <MenuItem key="In Progress" value="In Progress">
            In Progress
          </MenuItem>
          <MenuItem key="New order" value="New order">
            New order
          </MenuItem>
        </TextField>
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
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
            {/* TODO: add component that show products */}
          </CardContent>
        </Collapse>
      </Grid>
    </Box>
  );
};

export default Order;
