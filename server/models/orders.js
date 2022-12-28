const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ordersSchema = new Schema({
  order_status: String,
  created_at: Date,
  products: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product"
    }],
  user_id: String,
});

// Compile model from schema
module.exports = mongoose.model("Order", ordersSchema);