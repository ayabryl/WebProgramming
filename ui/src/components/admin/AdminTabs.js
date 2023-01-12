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
import Orders from "./Orders";
import AddProductForm from "./AddProductForm";

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

const AdminTabs = () => {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%", bgcolor: "background.paper" }}>
      <Tabs value={value} onChange={handleChange} centered>
        <Tab icon={<ViewListIcon />} label="Orders" iconPosition="end"></Tab>
        <Tab icon={<LeaderboardIcon />} label="Statistics" iconPosition="end" />
        <Tab icon={<AddCircleIcon />} label="Add product" iconPosition="end" />
      </Tabs>

      <TabPanel value={value} index={0}>
        <Orders specificUser={false} />
      </TabPanel>
      <TabPanel value={value} index={1}>
        graph
      </TabPanel>
      <TabPanel value={value} index={2}>
        <AddProductForm />
      </TabPanel>
    </Box>
  );
};

export default AdminTabs;
