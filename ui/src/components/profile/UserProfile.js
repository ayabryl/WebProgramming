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
import PropTypes from "prop-types";
import Typography from "@mui/material/Typography";
import EditIcon from "@mui/icons-material/Edit";
import CancelIcon from "@mui/icons-material/Cancel";
import { styled } from "@mui/material/styles";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import ViewListIcon from "@mui/icons-material/ViewList";
import LeaderboardIcon from "@mui/icons-material/Leaderboard";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import Orders from "../admin/Orders";
import AddProductForm from "../admin/AddProductForm";
import UserDetails from "./UserDetails";

import toast, { Toaster } from "react-hot-toast";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}

const StyledH1 = styled("h1")({
  textAlign: "center",
});

const UserProfile = () => {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box
      sx={{
        width: "80%",
        bgcolor: "background.paper",
      }}
    >
      <Tabs value={value} onChange={handleChange} centered>
        <Tab icon={<LeaderboardIcon />} label="My Details" iconPosition="end" />
        <Tab icon={<ViewListIcon />} label="My Orders" iconPosition="end" />
      </Tabs>

      <TabPanel value={value} index={0}>
        <UserDetails />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Orders specificUser={true} />
      </TabPanel>
    </Box>
  );
};

export default UserProfile;
