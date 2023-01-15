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
import { useNavigate } from "react-router-dom";
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
  const navigate = useNavigate();

  const { login, logout, email, isAdmin } = useLoginContext();

  const handleLogoutClicked = (e) => {
    console.log("user logout");
    logout();
    navigate("/");
  };
  const handleIconComponent = () => {
    // <Link to="/auth">
    //   <IconButton size="large" edge="end" style={{ color: "white" }}>
    //     <LoginIcon />
    //   </IconButton>
    // </Link>

    // user not login
    if (email === null) {
      return (
        <Link to="/auth">
          <IconButton size="large" edge="end" style={{ color: "white" }}>
            <LoginIcon />
          </IconButton>
        </Link>
      );
    } else {
      // user alredy login
      // call to logout function
      return (
        <IconButton
          size="large"
          edge="end"
          style={{ color: "white" }}
          onClick={handleLogoutClicked}
        >
          <LogoutIcon />
        </IconButton>
      );
    }
  };

  const handleLogInProfile = () => {
    if (email === null) {
      return null;
    } else {
      return (
        <Link to="/profile">
          <IconButton size="large" edge="end" style={{ color: "white" }}>
            <AccountCircle />
          </IconButton>
        </Link>
      );
    }
  };

  const handleAdminLogin = () => {
    // if (email === null && isAdmin === false) {
    //   return null;
    // } else if (isAdmin === true) {
    return (
      <Link to="/admin">
        <IconButton size="large" edge="end" style={{ color: "white" }}>
          <BuildIcon />
        </IconButton>
      </Link>
    );
    // }
  };

  return (
    <Box sx={{ flexGrow: 1, mr: 2, ml: 2 }}>
      <AppBar position="static" style={{ background: "success" }}>
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
            {handleLogInProfile()}
            {handleAdminLogin()}
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
};
export default NavigationBar;
