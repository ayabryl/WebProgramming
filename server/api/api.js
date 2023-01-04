const Product = require("../models/products");
const Order = require("../models/orders");
const User = require("../models/users");
const getProducts = async () => {
  return await Product.find(
    {},
    "id price name brand price_sign product_link description category product_type image_link product_colors"
  );
};

const getOrders = async () => {
  return await Order.find({}, "_id order_status created_at products user_id");
};

const getUsers = async () => {
  return await User.find(
    {},
    "_id name phone_number address_line city is_admin comment"
  );
};

const getUserById = async (id) => {
  return await User.findById(id);
};

const addProducts = async (products) => {
  products.forEach((element) => {
    const newProduct = new Product(element);
    newProduct.save((err, result) => {
      if (err) {
        console.log(err);
        res.send("error creating product. error: " + err);
      }
    });
  });
};

module.exports = { getProducts, getOrders, getUsers, addProducts, getUserById };
