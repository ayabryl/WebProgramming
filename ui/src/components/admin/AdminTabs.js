import { useState, useContext, useEffect } from "react";
import {
  Button,
  TextField,
  Grid,
  Box,
  Paper,
  Input,
  IconButton,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import CancelIcon from "@mui/icons-material/Cancel";
import { styled } from "@mui/material/styles";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import ViewListIcon from "@mui/icons-material/ViewList";
import LeaderboardIcon from "@mui/icons-material/Leaderboard";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import Orders from "./Orders";

import toast, { Toaster } from "react-hot-toast";

const StyledH1 = styled("h1")({
  textAlign: "center",
});

const AdminTabs = () => {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%", bgcolor: "background.paper" }}>
      <Tabs value={value} onChange={handleChange} centered>
        <Tab icon={<ViewListIcon />} label="Orders" iconPosition="end">
          <Orders />
        </Tab>
        <Tab icon={<LeaderboardIcon />} label="Statistics" iconPosition="end" />
        <Tab icon={<AddCircleIcon />} label="Add product" iconPosition="end" />
      </Tabs>
    </Box>
  );
};

export default AdminTabs;
