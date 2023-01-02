const Product = require("../models/products");
const Order = require("../models/orders");
const User = require("../models/users");
const getProducts = async () => {
  return await Product.find(
    {},
    "id price brand price_sign product_link description category product_type image_link"
  );
};

const getOrders = async () => {
  return await Order.find({}, "_id order_status created_at products user_id");
};

const getUsers = async () => {
  return await User.find(
    {},
    "user_id username password email address is_admin"
  );
};

module.exports = { getProducts, getOrders, getUsers };
