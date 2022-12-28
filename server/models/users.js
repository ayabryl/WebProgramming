const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = new Schema({
  user_id: Number,
  username: String,
  password: String,
  email: String,
  address: String,
  is_admin: Boolean
});

// Compile model from schema
module.exports = mongoose.model("User", productSchema);