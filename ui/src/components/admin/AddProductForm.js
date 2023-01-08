import React, { useState } from "react";
import {
  TextField,
  FormControl,
  InputLabel,
  Input,
  Button,
  Grid,
  Typography,
} from "@mui/material/";

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
  };

  return (
    <form onSubmit={handleSubmit}>
      <Grid sx={{ mt: 2 }} container spacing={1}>
        <Grid item xs={2}>
          <TextField
            label="Price"
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={2}>
          <TextField
            label="Name"
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={2}>
          <TextField
            label="Brand"
            type="text"
            name="brand"
            value={formData.brand}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={2}>
          <TextField
            label="Price Sign"
            type="text"
            name="priceSign"
            value={formData.priceSign}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={2}>
          <TextField
            label="Product Link"
            type="text"
            name="productLink"
            value={formData.productLink}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={2}>
          <TextField
            label="Description"
            type="text"
            name="description"
            value={formData.description}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={2}>
          <TextField
            label="Category"
            type="text"
            name="category"
            value={formData.category}
            onChange={handleChange}
          />
        </Grid>
        <FormControl>
          <Grid item xs={12} container>
            <Grid item xs={12}>
              <Typography>Product Colors</Typography>
            </Grid>
            <Grid item xs={12}>
              {productColors.map((color, index) => (
                <div key={index}>
                  <Grid item xs={12} container>
                    <Grid item xs={3}>
                      <FormControl>
                        <InputLabel htmlFor={`hex_value-${index}`}>
                          Hex Value
                        </InputLabel>
                        <Input
                          id={`hex_value-${index}`}
                          name="hexValue"
                          type="text"
                          value={color.hexValue}
                          onChange={(event) => handleColorChange(index, event)}
                        />
                      </FormControl>
                    </Grid>
                    <Grid item xs={3}>
                      <FormControl>
                        <InputLabel htmlFor={`color_name-${index}`}>
                          Color Name
                        </InputLabel>
                        <Input
                          id={`color_name-${index}`}
                          name="colorName"
                          type="text"
                          value={color.colorName}
                          onChange={(event) => handleColorChange(index, event)}
                        />
                      </FormControl>
                    </Grid>

                    <Grid item xs={3}>
                      <Button onClick={() => handleRemoveColor(index)}>
                        Remove Color
                      </Button>
                    </Grid>
                  </Grid>
                </div>
              ))}
            </Grid>
            <Button onClick={handleAddColor}>Add Another Color</Button>
          </Grid>
        </FormControl>
      </Grid>
    </form>
  );
};
export default AddProductForm;
