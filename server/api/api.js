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

const getOrdersByUserId = async (id) => {
  return await Order.find({ user_id: id });
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

const updateUser = async (user) => {
  const filter = { _id: user._id };
  const update = { ...user };
  const updatedUser = await User.findOneAndUpdate(filter, update, {
    new: true,
  });
  return updatedUser;
};

const updateOrder = async (order) => {
  console.log(order);
  const filter = { _id: order._id };
  const update = { ...order };
  const updatedOrder = await Order.findOneAndUpdate(filter, update, {
    new: true,
  });
  return updatedOrder;
};

const updateProduct = async (product) => {
  const filter = { _id: product._id };
  const update = { ...product };
  const updatedProduct = await Product.findOneAndUpdate(filter, update, {
    new: true,
  });
  return updatedProduct;
};

const productStatistic = async () => {
  const productStatistic = await Order.aggregate([
    {
      $unwind: "$products",
    },
    {
      $group: {
        _id: "$products.product_name",
        total: { $sum: 1 },
      },
    },
  ]);

  return productStatistic;

  // const productStatistic = await Order.mapReduce(
  //   function () {
  //     if (this.products && this.products.length > 0) {
  //       this.products.forEach((product) => {
  //         emit(product.product_name, 1);
  //       });
  //     }
  //   },
  //   function (key, values) {
  //     if (values && values.length > 0) {
  //       return values.reduce((acc, curr) => acc + curr, 0);
  //     }
  //   },
  //   {
  //     out: { inline: 1 },
  //     // query: { order_status: "completed" },
  //   }
  // );

  return productStatistic;
};

const deleteProduct = async (id) => {
  return await Product.deleteOne({ _id: id });
};

const deleteNullProducts = async () => {
  try {
    await Product.deleteMany({ category: null });
    await Product.deleteMany({ image_link: null });
    await Product.deleteMany({ description: null });
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  getProducts,
  deleteNullProducts,
  getOrders,
  getUsers,
  addProducts,
  updateUser,
  updateOrder,
  updateProduct,
  getUserById,
  getOrdersByUserId,
  productStatistic,
  deleteProduct,
};
