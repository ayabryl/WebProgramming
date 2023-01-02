const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const axios = require("axios");
const Product = require("./models/products");
const Order = require("./models/orders");
const User = require("./models/users");
const {
  getProducts,
  getUsers,
  getOrders,
  addProducts,
  getUserById,
} = require("./api/api");
const hostname = "localhost";
const port = 3001;
const app = express(bodyParser.urlencoded({ extended: false }));

const cors = require("cors");
const corsOptions = {
  origin: "*",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};

app.use(bodyParser.json());
app.use(cors(corsOptions));
app.listen(3001, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

const mongoDB =
  "mongodb+srv://guest_user:Aa123456@cluster0.emt0ekc.mongodb.net/?retryWrites=true&w=majority";
mongoose
  .connect(mongoDB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: "web_final_project",
  })
  .then(() => {
    console.log("mongo connection open");
  })
  .catch((err) => {
    console.log("error connecting to mongo: " + err);
  });

app.get("/", function (req, res) {
  res.send("Server is working");
});

app.get("/products", async (req, res) => {
  try {
    const products = await getProducts();
    res.send(products);
  } catch (err) {
    res.send(err);
  }
});

app.get("/users", async (req, res) => {
  try {
    const users = await getUsers();
    res.send(users);
  } catch (err) {
    res.send(err);
  }
});

app.get("/users/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const user = await getUserById(id);
    res.send(user);
  } catch (err) {
    res.send("User not found - " + err);
  }
});

app.get("/users/isAdmin/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const user = await getUserById(id);
    res.send(user.is_admin);
  } catch (err) {
    res.send("Error finding user or decide if manager - " + err);
  }
});

app.get("/orders", async (req, res) => {
  try {
    const orders = await getOrders();
    res.send(orders);
  } catch (err) {
    res.send(err);
  }
});

app.post("/addProduct", async (req, res) => {
  try {
    const newProduct = new Product(req.body);
    await addProducts([newProduct]);
    res.send("success adding new product");
  } catch {
    console.log(err);
    res.send("error creating product. error: " + err);
  }
});

app.post("/addProducts", async (req, res) => {
  await axios
    .get(
      "http://makeup-api.herokuapp.com/api/v1/products.json?brand=covergirl&product_type=lipstick"
    )
    .then(async function (response) {
      const newProducts = response.data.map((element) => {
        const newProduct = new Product({
          id: element.id,
          price: element.price,
          brand: element.brand,
          price_sign: element.price_sign,
          product_link: element.product_link,
          description: element.description,
          category: element.category,
          product_type: element.product_type,
          image_link: element.image_link,
          description: element.description,
        });
        newProduct.save((err, result) => {
          if (err) {
            console.log(err);
            res.send("error creating product. error: " + err);
          }
        });
      });
    })
    .catch(function (error) {
      console.log(error);
    });
  res.send("success adding products");
});

app.post("/addUser", async (req, res) => {
  const newUser = new User(req.body);
  newUser.save((err, result) => {
    if (err) {
      console.log(err);
      res.send("error creating user. error: " + err);
    }
  });
  res.send("success adding new user");
});

app.post("/addOrder", async (req, res) => {
  const newOrder = new Order(req.body);
  newOrder.save((err, result) => {
    if (err) {
      console.log(err);
      res.send("error creating order. error: " + err);
    }
  });
  res.send("success adding new order");
});
