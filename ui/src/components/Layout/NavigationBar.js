import * as React from "react";
import { Link } from "react-router-dom";
import { useContext } from "react";
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  InputBase,
  styled,
  alpha,
} from "@mui/material";

import AccountCircle from "@mui/icons-material/AccountCircle";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import BuildIcon from "@mui/icons-material/Build";
import { LoginContext } from "../../contexts/LoginContext";
import SearchBar from "./SearchBar";

const useLoginContext = () => {
  const context = useContext(LoginContext);
  return context;
};

const NavigationBar = () => {
  const { login, logout, email } = useLoginContext();

  const handleLogoutClicked = (e) => {
    console.log("user logout");
    logout();
  };
  const handleIconComponent = () => {
    return (
      <Link to="/auth">
        <IconButton size="large" edge="end" style={{ color: "white" }}>
          <LoginIcon />
        </IconButton>
      </Link>
    );
    // user not login
    // if (email === null) {
    //   return (
    //     <Link to="/auth">
    //       <IconButton size="large" edge="end" style={{ color: "white" }}>
    //         <LoginIcon />
    //       </IconButton>
    //     </Link>
    //   );
    // } else {
    //   // user alredy login
    //   // call to logout function

    //   handleLogoutClicked();
    //   return (
    //     <IconButton
    //       size="large"
    //       edge="end"
    //       style={{ color: "white" }}
    //       onClick={handleLogoutClicked}
    //     >
    //       <LogoutIcon />
    //     </IconButton>
    //   );
    // }
  };

  return (
    <Box sx={{ flexGrow: 1, mr: 2, ml: 2 }}>
      <AppBar position="static" style={{ background: "#8D91C7" }}>
        <Toolbar>
          <Link to="/" style={{ textDecoration: "none" }}>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ display: { xs: "none", sm: "block" } }}
              style={{ color: "white" }}
            >
              My Makeup
            </Typography>
          </Link>
          <SearchBar />
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            {handleIconComponent()}
            <Link to="/cart">
              <IconButton size="large" edge="end" style={{ color: "white" }}>
                <ShoppingCartIcon />
              </IconButton>
            </Link>
            <Link to="/profile">
              <IconButton size="large" edge="end" style={{ color: "white" }}>
                <AccountCircle />
              </IconButton>
            </Link>
            <Link to="/admin">
              <IconButton size="large" edge="end" style={{ color: "white" }}>
                <BuildIcon />
              </IconButton>
            </Link>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
};
export default NavigationBar;
