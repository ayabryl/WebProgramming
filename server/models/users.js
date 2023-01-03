const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  _id: String,
  name: String,
  phone_number: String,
  city: String,
  address_line: String,
  is_admin: Boolean,
  comment: String,
});

// Compile model from schema
module.exports = mongoose.model("User", userSchema);
