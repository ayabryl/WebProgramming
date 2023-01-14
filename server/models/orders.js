const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ordersSchema = new Schema({
  order_status: String,
  created_at: Date,
  products: [{
    product_name: String,
    amount: Number,
    color: {hex_value: String,colour_name: String},
    price: Number
    }],
  user_id: String,
  total_price: Number
});

// Compile model from schema
module.exports = mongoose.model("Order", ordersSchema);

product_colors: [
  {
    hex_value: String,
    colour_name: String,
  },
];
