import { useState, Fragment } from "react";
import { CardMedia, Typography, Box, IconButton, Grid } from "@mui/material";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import DeleteForever from "@mui/icons-material/DeleteForever";
import EditSharpIcon from "@mui/icons-material/EditSharp";
import axios from "axios";
import EditProduct from "../admin/EditProduct";
import toast, { Toaster } from "react-hot-toast";

const ProductCard = (props) => {
  const [openDialog, setOpenDialog] = useState(false);

  const fetchData = () => {
    axios
      .delete(`http://localhost:3001/deleteProduct/` + props.product._id)
      .then((res) => {
        console.log(res);
        toast.success("Product successfuly deleted");
      })
      .catch((error) => {
        console.log(error);
        toast.error("Error Occured, Try again");
      });
  };

  const handleEditProduct = () => {
    setOpenDialog(true);
  };

  const handleDeleteProduct = () => {
    fetchData();
  };

  return (
    <Fragment>
      <Toaster position="top-center" reverseOrder={false} />
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
                <Fragment>
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
                </Fragment>
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
    </Fragment>
  );
};
export default ProductCard;
