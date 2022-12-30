import * as React from "react";
import { Link } from "react-router-dom";

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
import SearchIcon from "@mui/icons-material/Search";
import AccountCircle from "@mui/icons-material/AccountCircle";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import LoginIcon from "@mui/icons-material/Login";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "50ch",
    },
  },
}));

const NavigationBar = () => {
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
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ "aria-label": "search" }}
            />
          </Search>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            <Link to="/auth">
              <IconButton
                size="large"
                edge="end"
                aria-label="account of current user"
                aria-haspopup="true"
                style={{ color: "white" }}
              >
                <LoginIcon />
              </IconButton>
            </Link>
            <Link to="/cart">
              <IconButton
                size="large"
                edge="end"
                aria-label="account of current user"
                aria-haspopup="true"
                style={{ color: "white" }}
              >
                <ShoppingCartIcon />
              </IconButton>
            </Link>
            <Link to="/profile">
              <IconButton
                size="large"
                edge="end"
                aria-label="account of current user"
                aria-haspopup="true"
                style={{ color: "white" }}
              >
                <AccountCircle />
              </IconButton>
            </Link>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
};
export default NavigationBar;
