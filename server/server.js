const express = require("express");
const mongoose = require("mongoose");
const { WebSocketServer } = require('ws');
const bodyParser = require("body-parser");
const { uuid } = require('uuidv4');
const axios = require("axios");
const Product = require("./models/products");
const Order = require("./models/orders");
const User = require("./models/users");
const {
  getProducts,
  getUsers,
  getOrders,
  addProducts,
  updateUser,
  updateOrder,
  updateProduct,
  getUserById,
  getOrdersByUserId,
  productStatistic,
  deleteProduct,
  deleteNullProducts,
} = require("./api/api");
const { parse } = require("url")
const hostname = "localhost";
const port = 3001;
const app = express(bodyParser.urlencoded({ extended: false }));
const cors = require("cors");
const corsOptions = {
  origin: "*",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};

const clients = {};
const adminClients = {}

app.use(bodyParser.json());
app.use(cors(corsOptions));
let httpServer = app.listen(3001, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
const wsServer = new WebSocketServer({ server: httpServer });

wsServer.on('connection', function (connection, req) {
  const userId = parse(req.url, true).query.userId;
  const isAdmin = (parse(req.url, true).query.isAdmin === 'true');
  console.log(`Recieved a new connection.`);
  clients[userId] = connection;
  if (isAdmin) { 
    adminClients[userId] = connection 
  };
  console.log(`${userId} connected.`);
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

app.get("/orders/userId/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const orders = await getOrdersByUserId(id);
    res.send(orders);
  } catch (err) {
    res.send("Error finding orders for this user " + err);
  }
});

productStatistic;

app.get("/orders/productStatistic", async (req, res) => {
  try {
    const products = await productStatistic();
    res.send(products);
  } catch (err) {
    res.send("Error finding products" + err);
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

app.put("/updateUser", async (req, res) => {
  try {
    const updatedUser = await updateUser(req.body);
    res.send(updatedUser);
  } catch {
    console.log(err);
    res.send("error updating user. error: " + err);
  }
});

app.put("/updateOrder", async (req, res) => {
  try {
    const updatedOrder = await updateOrder(req.body);
    if (clients[updatedOrder.user_id]) {
      clients[updatedOrder.user_id].send(JSON.stringify(updatedOrder))
    }
    res.send(updatedOrder);
  } catch (err) {
    console.log(err);
    res.send("error updating order. error: " + err);
  }
});

app.put("/updateProduct", async (req, res) => {
  try {
    const updatedProduct = await updateProduct(req.body);
    res.send(updatedProduct);
  } catch {
    console.log(err);
    res.send("error updating product. error: " + err);
  }
});

app.post("/addProducts", async (req, res) => {
  await axios
    .get("https://makeup-api.herokuapp.com/api/v1/products.json?brand=nyx")
    .then(async function (response) {
      const newProducts = response.data.map((element) => {
        const newProduct = new Product({
          id: element.id,
          price: element.price,
          brand: element.brand,
          name: element.name,
          product_link: element.product_link,
          description: element.description,
          category: element.category,
          product_type: element.product_type,
          image_link: element.image_link,
          description: element.description,
          product_colors: element.product_colors,
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
    } else {
      Object.keys(adminClients).forEach(user => {
        //console.log(user, adminClients[user]);
        //console.log(result)
        adminClients[user].send(JSON.stringify(newOrder));
      });
    }
  });
  res.send("success adding new order");
});

app.delete("/deleteProduct/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const ans = await deleteProduct(id);
    res.send("success delete product: " + id);
  } catch (err) {
    res.send("Error delete this product " + err);
  }
});

app.delete("/deleteNullProducts/", async (req, res) => {
  try {
    const ans = await deleteNullProducts();
    res.send(ans);
  } catch (err) {
    res.send("Error delete this product " + err);
  }
});
