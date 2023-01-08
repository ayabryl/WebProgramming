import { useState, useContext, useEffect } from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
  IconButton,
  TextField,
  MenuItem,
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

import toast, { Toaster } from "react-hot-toast";

const StyledH1 = styled("h1")({
  textAlign: "center",
});

const Order = (props) => {
  const [order, setOrder] = useState(props.order);
  const [customer, setCustomer] = useState([]);

  const fetchOrderCustomerData = (user_id) => {
    axios.get(`http://localhost:3001//users/${user_id}`).then((res) => {
      const data = res.data;
      setCustomer(data);
    });
  };
  useEffect(() => {
    console.log("Fetching data...");
    fetchOrderCustomerData(order.user_id);
  }, []);
  return (
    <Card
      sx={{
        display: "flex",
        height: "100%",
        boxShadow: 1,
        borderRadius: 2,
        justifyContent: "space-around",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <CardContent>
          <Typography component="div" variant="body1">
            {order.created_at}
          </Typography>
          <Typography variant="body2" color="text.secondary" component="div">
            {customer.name}
          </Typography>
          <Typography variant="body2" color="text.secondary" component="div">
            {customer.phone_number}
          </Typography>
          <Typography variant="body2" color="text.secondary" component="div">
            {customer.city}
          </Typography>
          <Typography variant="body2" color="text.secondary" component="div">
            {customer.address_line}
          </Typography>
          <Typography variant="body2" color="text.secondary" component="div">
            {customer.comment}
          </Typography>
        </CardContent>

        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "right",
            ml: 1,
            justifyContent: "space-around",
          }}
        >
          <TextField
            id="outlined-select-currency"
            select
            label="order status"
            defaultValue={order.order_status}
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
        </Box>
      </Box>
    </Card>
  );
};

export default Order;
