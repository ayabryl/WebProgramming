import { useState, useRef, Fragment, useContext } from "react";
import {
  Button,
  TextField,
  DialogTitle,
  Dialog,
  DialogActions,
  DialogContent,
  FormControl,
  InputLabel,
  Input,
  Grid,
  Typography,
  Box,
  IconButton,
} from "@mui/material/";

import { LoginContext } from "../../contexts/LoginContext";
import { useNavigate } from "react-router-dom";
import {} from "@mui/material/";
import toast, { Toaster } from "react-hot-toast";
import { StyledButtonContained, theme } from "../../theme";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import CancelIcon from "@mui/icons-material/Cancel";

const EditProduct = (props) => {
  const open = props.open;
  const handleClose = props.handleClose;

  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    price: props.product.price,
    name: props.product.name,
    brand: props.product.brand,
    priceSign: props.product.priceSign,
    productLink: props.product.productLink,
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

  const [selectedColor, setSelectColor] = useState("");

  //   const handleAddColor = () => {
  //     setProductColors([...productColors, { hexValue: "", colorName: "" }]);
  //   };

  const handleRemoveColor = () => {
    const tempColors = formData.productColors.filter(
      (color) => color.hex_value !== selectedColor
    );
    setFormData((prevState) => ({
      ...prevState,
      productColors: tempColors,
    }));
    setSelectColor("");
    console.log("remove click");
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // submit form data to server

    const body = {
      price: formData.price,
      name: formData.name,
      brand: formData.brand,
      priceSign: formData.priceSign,
      productLink: formData.productLink,
      description: formData.description,
      category: formData.category,
      productType: formData.productType,
      imageLink: formData.imageLink,
      productColors: formData.productColors,
    };
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    };
    // Save the new product in db
    fetch("http://localhost:3001/addProduct", requestOptions)
      .then((response) => {
        console.log(response);
        toast.error("The product successfuly added");
        navigate("/", { replace: true });
      })
      .catch((error) => {
        console.log(error);
        toast.error("Error Occured, Try again");
      });
  };

  const navigate = useNavigate();
  //   const validate = (password) => {
  //     // Validate password
  //     if (!password) {
  //       setPasswordError(true);
  //       setPasswordHelperText("Password is required");
  //     } else if (password.length < 8) {
  //       setPasswordError(true);
  //       setPasswordHelperText("Password must be at least 8 characters long");
  //     } else {
  //       setPasswordError(false);
  //       setPasswordHelperText("");
  //     }

  //     console.log(uid);

  //     if (passwordError) {
  //       return false;
  //     } else {
  //       return true;
  //     }
  //   };

  const submitHandler = (event) => {
    event.preventDefault();

    // const enteredPassword = passwordInputRef.current.value;

    // if (validate(enteredPassword)) {
    //   setIsLoading(true);

    //   // let url;

    //   const url = `https://identitytoolkit.googleapis.com/v1/accounts:update?key=${key}`;
    //   fetch(url, {
    //     method: "POST",
    //     body: JSON.stringify({
    //       localId: uid,
    //       password: enteredPassword,
    //       returnSecureToken: false,
    //     }),
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //   })
    //     .then((res) => {
    //       setIsLoading(false);
    //       if (res.ok) {
    //         return res.json();
    //       } else {
    //         return res.json().then((data) => {
    //           let errorMessage = `Changing Password failed: ${data.error.message}`;

    //           throw new Error(errorMessage);
    //         });
    //       }
    //     })
    //     .then((data) => {
    //       //ToDo: save the user to the page and exit from this page
    //       toast.success(`Successfully changed!`);
    //       handleClose();
    //       console.log(data);
    //     })
    //     .catch((err) => {
    //       toast.error(err.message);
    //     });
    // }
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

  return (
    <Fragment>
      <Toaster position="top-center" reverseOrder={false} />
      <Dialog open={open} onClose={handleClose} sx={{ width: "100%" }}>
        <DialogTitle sx={{ color: "text.light", fontWeight: "bold" }}>
          Edit Product #{props.product.id}
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={1} justifyContent="center">
            <Toaster position="top-center" reverseOrder={false} />
            <form onSubmit={handleSubmit}>
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
                      label="Price Sign"
                      type="text"
                      fullWidth="100%"
                      name="priceSign"
                      value={formData.priceSign}
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
                      name="Image link"
                      value={formData.imageLink}
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item xs={12}></Grid>
                  <Grid item sx={12}>
                    <IconButton
                      variant="outlined"
                      onClick={handleRemoveColor}
                      style={{
                        borderColor: "#FFFFFF",
                        borderStyle: "solid",
                        backgroundColor: "#FFFFFF",
                        display: "inline-block",
                      }}
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
                  <Grid item sx={12}>
                    <IconButton
                      variant="outlined"
                      style={{
                        borderColor: "#FFFFFF",
                        borderStyle: "solid",
                        backgroundColor: "#FFFFFF",
                        display: "inline-block",
                      }}
                      sx={{ fontWeight: "bold" }}
                    >
                      <AddIcon />
                    </IconButton>
                  </Grid>
                  {/* <Grid
                    item
                    xs={12}
                    container
                    align="center"
                    justifyContent="center"
                  >
                    <Grid item xs={3} sx={{ mr: 1.5 }}>
                      <FormControl>
                        <InputLabel>Hex Value</InputLabel>
                        <Input
                          //   id={`hex_value-${index}`}
                          name="hexValue"
                          type="text"
                          //   value={color.hexValue}
                          onChange={(event) => handleColorChange()}
                        />
                      </FormControl>
                    </Grid>
                    <Grid item xs={3} sx={{ mr: 0.5 }}>
                      <FormControl>
                        <InputLabel>Color Name</InputLabel>
                        <Input
                          //   id={`color_name-${index}`}
                          name="colorName"
                          type="text"
                          //   value={color.colorName}
                          onChange={(event) => handleColorChange()}
                        />
                      </FormControl>
                    </Grid> */}
                  {/* </Grid> */}
                </Grid>
              </Box>
            </form>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleClose}
            sx={{ color: "error.dark", fontWeight: "bold" }}
          >
            Cancel
          </Button>
          <Button
            onClick={submitHandler}
            sx={{ color: "success.dark", fontWeight: "bold" }}
          >
            Change
          </Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
};

export default EditProduct;
