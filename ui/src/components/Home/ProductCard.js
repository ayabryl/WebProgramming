import * as React from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
  IconButton,
  Grid,
} from "@mui/material";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { Link } from "react-router-dom";

const ProductCard = (props) => {
  return (
    <Box
      sx={{
        display: "flex",
        boxShadow: 1,
        borderRadius: 2,
        width: "100%",
        height: "100%",
      }}
    >
      <Grid container direction="row">
        <Grid
          item
          xs={8}
          container
          justifyContent="sapce-between"
          alignItems="space-between"
          direction="row"
        >
          <Link to="/product" style={{ textDecoration: "none" }}>
            <Grid item xs={12}>
              <Typography
                sx={{
                  color: "primary.main",
                  fontWeight: "bold",
                  mt: 1,
                  ml: 1,
                }}
              >
                {props.category}
              </Typography>

              <Typography
                sx={{
                  color: "secondary.main",
                  ml: 1,
                }}
              >
                {props.name}
              </Typography>
            </Grid>
          </Link>
          <Grid
            item
            xs={12}
            display="flex"
            justifyContent="space-around"
            alignItems="flex-end"
            direction="row"
          >
            <Typography
              sx={{
                display: "flex",
                color: "primary.main",
                ml: 2,
                mb: 1,
              }}
            >
              {props.price}₪
            </Typography>

            <IconButton sx={{ color: "primary.main" }}>
              <AddShoppingCartIcon />
            </IconButton>
          </Grid>
        </Grid>
        <Grid item xs={4}>
          <Link to="/product" style={{ textDecoration: "none" }}>
            <CardMedia
              component="img"
              // sx={{ width: "100%", height: "100%" }}
              image={props.imageURL}
              alt={props.name}
            />
          </Link>
        </Grid>
      </Grid>
    </Box>
  );
};
export default ProductCard;
