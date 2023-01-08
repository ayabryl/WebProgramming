import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  TextField,
  FormControl,
  InputLabel,
  Input,
  Button,
  Grid,
  Typography,
  Box,
} from "@mui/material/";
import toast, { Toaster } from "react-hot-toast";

const AddProductForm = () => {
  const [formData, setFormData] = useState({
    price: "",
    name: "",
    brand: "",
    priceSign: "",
    productLink: "",
    description: "",
    category: "",
    productType: "",
    imageLink: "",
    productColors: [],
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const [productColors, setProductColors] = useState([
    { hexValue: "", colorName: "" },
  ]);

  const handleAddColor = () => {
    setProductColors([...productColors, { hexValue: "", colorName: "" }]);
  };

  const handleRemoveColor = (index) => {
    setProductColors(productColors.filter((_, i) => i !== index));
  };

  const handleColorChange = (index, event) => {
    const values = [...productColors];
    values[index][event.target.name] = event.target.value;
    setProductColors(values);
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
      productColors: productColors,
    };
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    };
    // Save the new user in mongo (with the firebase id)
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

  return (
    <Grid container spacing={1} justifyContent="center">
      <Toaster position="top-center" reverseOrder={false} />
      <form onSubmit={handleSubmit}>
        <Box
          sx={{
            display: "flex",
            height: "100%",
            width: 800,
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
            <Grid item xs={12}></Grid>

            <FormControl>
              <Grid
                item
                xs={12}
                container
                align="center"
                justifyContent="center"
                sx={{ mt: 2 }}
              >
                <Grid item xs={12}>
                  <Typography>Product Colors: </Typography>
                </Grid>
                <Grid
                  item
                  xs={12}
                  container
                  spcing={1}
                  align="center"
                  justifyContent="center"
                >
                  {productColors.map((color, index) => (
                    <div key={index}>
                      <Grid
                        item
                        xs={12}
                        container
                        align="center"
                        justifyContent="center"
                      >
                        <Grid item xs={3} sx={{ mr: 1 }}>
                          <FormControl>
                            <InputLabel htmlFor={`hex_value-${index}`}>
                              Hex Value
                            </InputLabel>
                            <Input
                              id={`hex_value-${index}`}
                              name="hexValue"
                              type="text"
                              value={color.hexValue}
                              onChange={(event) =>
                                handleColorChange(index, event)
                              }
                            />
                          </FormControl>
                        </Grid>
                        <Grid item xs={3} sx={{ mr: 1 }}>
                          <FormControl>
                            <InputLabel htmlFor={`color_name-${index}`}>
                              Color Name
                            </InputLabel>
                            <Input
                              id={`color_name-${index}`}
                              name="colorName"
                              type="text"
                              value={color.colorName}
                              onChange={(event) =>
                                handleColorChange(index, event)
                              }
                            />
                          </FormControl>
                        </Grid>

                        <Button onClick={() => handleRemoveColor(index)}>
                          Remove Color
                        </Button>
                      </Grid>
                    </div>
                  ))}
                </Grid>
                <Button sx={{ mt: 1 }} onClick={handleAddColor}>
                  Add Another Color
                </Button>
              </Grid>
            </FormControl>
            <Grid item sx={4}>
              <Button variant="contained" sx={{ mt: 1 }} onClick={handleSubmit}>
                Add Product
              </Button>
            </Grid>
          </Grid>
        </Box>
      </form>
    </Grid>
  );
};
export default AddProductForm;
