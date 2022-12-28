const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = new Schema({
  id: Number,
  price: Number,
  brand: String,
  price_sign: String,
  product_link: String,
  description: String,
  category: String,
  product_type: String,
  image_link: String
});

// Compile model from schema
module.exports = mongoose.model("Product", productSchema);