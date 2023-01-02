const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  uid: Number,
  name: String,
  phone_number: String,
  city: String,
  street: String,
  house_number: Number,
  is_admin: Boolean,
});

// Compile model from schema
module.exports = mongoose.model("User", userSchema);
