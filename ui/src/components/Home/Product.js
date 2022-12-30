import * as React from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
  IconButton,
} from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
const Product = (props) => {
  // const handleAddToCart = (event) => {
  //   event.preventDefault();
  //   const selectedProdact = {
  //     name: props.name,
  //     description: props.description,
  //     price: props.price,
  //     imageURL: props.imageURL,
  //     id: props.id,
  //   };
  //   props.addToCart(selectedProdact);
  // };

  return (
    <Card
      sx={{
        display: "flex",
        height: 150,
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
          <Typography component="div" variant="h6">
            {props.name}
          </Typography>
          <Typography variant="body2" color="text.secondary" component="div">
            {props.description}
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
          <Typography
            sx={{
              display: "flex",
              alignItems: "center",
            }}
          >
            {props.price}₪
          </Typography>
          <IconButton
            size="large"
            edge="end"
            aria-label="account of current user"
            aria-haspopup="true"
          >
            <ArrowForwardIcon />
          </IconButton>
        </Box>
      </Box>
      <CardMedia
        component="img"
        sx={{ width: 170, maxHigh: 150, height: 150 }}
        image={props.imageURL}
        alt={props.name}
      />
    </Card>
  );
};
export default Product;
