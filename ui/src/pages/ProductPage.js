import Grid from "@mui/material/Grid";
import Product from "../components/Product";

const ProductPage = () => {

  const productToShow = {
        id: 1048,
        brand: "colourpop",
        name: "Lippie Pencil",
        price: "5.0",
        price_sign: "$",
        currency: "CAD",
        image_link: "https://cdn.shopify.com/s/files/1/1338/0845/collections/lippie-pencil_grande.jpg?v=1512588769",
        description: "Lippie Pencil A long-wearing and high-intensity lip pencil that glides on easily and prevents feathering. Many of our Lippie Stix have a coordinating Lippie Pencil designed to compliment it perfectly, but feel free to mix and match!",
        category: "pencil",
        product_type: "lip_liner",
        tag_list: ["cruelty free","Vegan"],
        product_colors: [ {hex_value: "#B28378",colour_name: "BFF Pencil"},{hex_value: "#A36B5E",colour_name: "951 Pencil"},
        {hex_value: "#966A60",colour_name: "Beeper Pencil"},{hex_value: "#8F5954",colour_name: "Oh Snap Pencil"}]
  };  


  return (

      <Product style={{ height:'100vh', width:'100vh'}} makeUpProduct={productToShow}></Product>
  );
};

export default ProductPage;