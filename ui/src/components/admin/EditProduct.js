import { useState, Fragment } from "react";
import {
  Button,
  TextField,
  DialogTitle,
  Dialog,
  DialogActions,
  DialogContent,
  FormControl,
  Grid,
  Box,
  IconButton,
} from "@mui/material/";

import toast, { Toaster } from "react-hot-toast";
import { StyledButtonContained, theme } from "../../theme";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import CancelIcon from "@mui/icons-material/Cancel";

const EditProduct = (props) => {
  const open = props.open;
  const handleClose = props.handleClose;
  const [selectedColor, setSelectColor] = useState("");
  const [handleAddColorClicked, setAddColorClicked] = useState(false);
  const [newColor, setNewColor] = useState({ hex_value: "", colour_name: "" });
  const [formData, setFormData] = useState({
    price: props.product.price,
    name: props.product.name,
    brand: props.product.brand,
    productLink: props.product.product_link,
    description: props.product.description,
    category: props.product.category,
    productType: props.product.type,
    imageLink: props.product.image_link,
    productColors: props.product.product_colors,
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleAddClicked = () => {
    if (newColor.colour_name !== "" && newColor.hex_value !== "") {
      let tempColors = formData.productColors;
      tempColors = [...formData.productColors, newColor];
      console.log(tempColors);
      setFormData((prevState) => ({
        ...prevState,
        productColors: tempColors,
      }));
      setNewColor({ hex_value: "", colour_name: "" });
    }
  };

  const handleRemoveColor = () => {
    const tempColors = formData.productColors.filter(
      (color) => color.hex_value !== selectedColor
    );
    setFormData((prevState) => ({
      ...prevState,
      productColors: tempColors,
    }));
    setSelectColor("");
  };

  const submitHandler = (event) => {
    event.preventDefault();
    const body = {
      _id: props.product._id,
      price: formData.price,
      name: formData.name,
      brand: formData.brand,
      product_link: formData.productLink,
      description: formData.description,
      category: formData.category,
      product_type: formData.productType,
      image_link: formData.imageLink,
      product_colors: formData.productColors,
    };

    const requestOptions = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    };
    // change product in db
    fetch("http://localhost:3001/updateProduct", requestOptions)
      .then((response) => {
        console.log(response);
        toast.success("The product successfuly changed");
        props.handleClose();
      })
      .catch((error) => {
        console.log(error);
        toast.error("Error Occured, Try again");
      });
  };

  const productsColors = formData.productColors.map((p) => (
    <Grid
      item
      onClick={() => setSelectColor(p.hex_value)}
      key={Math.random().toString()}
    >
      <span
        style={{
          height: "25px",
          width: "25px",
          borderColor: p.hex_value === selectedColor ? "#000000" : p.hex_value,
          borderStyle: "solid",
          borderWidth: "0.2em",
          backgroundColor: p.hex_value,
          borderRadius: "50%",
          display: "inline-block",
        }}
      ></span>
      {/* <Button>-</Button> */}
    </Grid>
  ));

  const handleCloseSelect = () => {
    props.handleClose();
    setFormData({
      price: props.product.price,
      name: props.product.name,
      brand: props.product.brand,
      productLink: props.product.product_link,
      description: props.product.description,
      category: props.product.category,
      productType: props.product.type,
      imageLink: props.product.image_link,
      productColors: props.product.product_colors,
    });
  };
  return (
    <Fragment>
      <Toaster position="top-center" reverseOrder={false} />
      <Dialog open={open} onClose={handleClose} sx={{ width: "100%" }}>
        <DialogTitle sx={{ color: "text.light", fontWeight: "bold" }}>
          Edit Product #{props.product._id}
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={1} justifyContent="center">
            <Toaster position="top-center" reverseOrder={false} />
            <form>
              <Box
                sx={{
                  display: "flex",
                  height: "100%",
                  width: "100%",
                  boxShadow: 1,
                  borderRadius: 2,
                }}
              >
                <Grid
                  sx={{ m: 2 }}
                  container
                  spacing={1}
                  align="center"
                  justifyContent="center"
                >
                  <Grid item xs={3.5}>
                    <TextField
                      label="Price"
                      type="number"
                      name="price"
                      fullWidth="100%"
                      value={formData.price}
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item xs={3.5}>
                    <TextField
                      label="Name"
                      type="text"
                      name="name"
                      fullWidth="100%"
                      value={formData.name}
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item xs={3.5}>
                    <TextField
                      label="Brand"
                      type="text"
                      fullWidth="100%"
                      name="brand"
                      value={formData.brand}
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item xs={3.5}>
                    <TextField
                      label="Product Link"
                      type="text"
                      fullWidth="100%"
                      name="productLink"
                      value={formData.productLink}
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item xs={3.5}>
                    <TextField
                      label="Description"
                      type="text"
                      fullWidth="100%"
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item xs={3.5}>
                    <TextField
                      label="Category"
                      type="text"
                      fullWidth="100%"
                      name="category"
                      value={formData.category}
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item xs={1}></Grid>
                  <Grid item xs={3.5}>
                    <TextField
                      label="Image link"
                      type="text"
                      fullWidth="100%"
                      name="imageLink"
                      value={formData.imageLink}
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item xs={12}></Grid>
                  <Grid item sx={12}>
                    <IconButton
                      variant="outlined"
                      onClick={handleRemoveColor}
                      sx={{ fontWeight: "bold" }}
                    >
                      <RemoveIcon />
                    </IconButton>
                  </Grid>
                  <FormControl>
                    <Grid
                      item
                      xs={12}
                      container
                      align="center"
                      justifyContent="center"
                      sx={{ mt: 2 }}
                      spacing={1}
                    >
                      {productsColors}
                    </Grid>
                  </FormControl>
                  {!handleAddColorClicked ? (
                    <Grid item sx={12}>
                      <IconButton
                        variant="outlined"
                        sx={{ fontWeight: "bold" }}
                        onClick={() => setAddColorClicked(true)}
                      >
                        <AddIcon />
                      </IconButton>
                    </Grid>
                  ) : (
                    <Fragment>
                      <Grid item sx={12}>
                        <IconButton
                          variant="outlined"
                          sx={{ fontWeight: "bold" }}
                          onClick={() => setAddColorClicked(false)}
                        >
                          <CancelIcon />
                        </IconButton>
                      </Grid>
                      <Grid
                        item
                        xs={12}
                        container
                        align="center"
                        justifyContent="center"
                      >
                        <Grid item xs={3} sx={{ mr: 1.5 }}>
                          <TextField
                            label="Hex Value"
                            type="text"
                            fullWidth="100%"
                            name="Hex Vaule"
                            value={newColor.hex_value}
                            onChange={(event) => {
                              setNewColor({
                                hex_value: event.target.value,
                                colour_name: newColor.colour_name,
                              });
                            }}
                          />
                        </Grid>
                        <Grid item xs={3}>
                          <TextField
                            label="Color name"
                            type="text"
                            fullWidth="100%"
                            name="Color name"
                            value={newColor.colour_name}
                            onChange={(event) => {
                              setNewColor({
                                hex_value: newColor.hex_value,
                                colour_name: event.target.value,
                              });
                            }}
                          />
                        </Grid>
                        <Grid item xs={3} sx={{ mr: 0.5 }}>
                          <StyledButtonContained
                            variant="contained"
                            sx={{ mt: 1 }}
                            onClick={handleAddClicked}
                          >
                            Add
                          </StyledButtonContained>
                        </Grid>
                      </Grid>
                    </Fragment>
                  )}
                </Grid>
              </Box>
            </form>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Grid container display="flex" justifyContent="space-between">
            <Button
              onClick={handleCloseSelect}
              sx={{ color: "error.dark", fontWeight: "bold" }}
            >
              Cancel
            </Button>
            <Button
              onClick={submitHandler}
              sx={{ color: "success.dark", fontWeight: "bold" }}
              type="submit"
            >
              Change
            </Button>
          </Grid>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
};

export default EditProduct;
