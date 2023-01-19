import * as React from "react";
import { useState } from "react";
import { CardMedia, Typography, Box, IconButton, Grid } from "@mui/material";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import DeleteForever from "@mui/icons-material/DeleteForever";
import EditSharpIcon from "@mui/icons-material/EditSharp";
import axios from "axios";
import EditProduct from "../admin/EditProduct";

const ProductCard = (props) => {
  const [openDialog, setOpenDialog] = useState(false);

  console.log("admin page");
  console.log(props.adminPage);
  const fetchData = () => {
    axios
      .delete(`http://localhost:3001/deleteProduct/` + props.product._id)
      .then((res) => {
        console.log(res);
      });
  };

  const handleEditProduct = () => {
    setOpenDialog(true);
  };

  const handleDeleteProduct = () => {
    fetchData();
  };

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
          <Grid item xs={12}>
            <Typography
              sx={{
                color: "primary.main",
                fontWeight: "bold",
                mt: 1,
                ml: 1,
              }}
            >
              {props.product.category}
            </Typography>

            <Typography
              sx={{
                color: "secondary.main",
                ml: 1,
              }}
            >
              {props.product.name}
            </Typography>
          </Grid>
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
              {props.product.price}₪
            </Typography>
            {!props.adminPage ? (
              <IconButton sx={{ color: "primary.main" }}>
                <AddShoppingCartIcon />
              </IconButton>
            ) : (
              <React.Fragment>
                <IconButton
                  sx={{ color: "secondary.main" }}
                  onClick={handleEditProduct}
                >
                  <EditSharpIcon />
                </IconButton>
                <IconButton
                  sx={{ color: "secondary.main" }}
                  onClick={handleDeleteProduct}
                >
                  <DeleteForever />
                </IconButton>
              </React.Fragment>
            )}
          </Grid>
        </Grid>
        <Grid item xs={4}>
          <CardMedia
            component="img"
            image={props.product.image_link}
            alt={props.product.name}
          />
        </Grid>
      </Grid>
      <EditProduct
        product={props.product}
        open={openDialog}
        handleClose={() => setOpenDialog(false)}
      />
    </Box>
  );
};
export default ProductCard;
