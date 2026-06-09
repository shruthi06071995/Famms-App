import express from "express";
import cors from "cors";
import products from "../data/products.js";

const app = express();

app.use(cors());
app.use(express.json());

const users = [];
const orders = [];

// Get Products
app.get("/api/products", (req, res) => {
  res.json(products);
});

// Add Product
app.post("/api/products", (req, res) => {
  const newProduct = {
    id: products.length + 1,
    ...req.body,
  };

  products.push(newProduct);

  res.status(201).json({
    message: "Product Added",
    product: newProduct,
  });
});

// Get Product By ID
app.get("/api/products/:id", (req, res) => {
  const id = Number(req.params.id);

  const product = products.find((p) => p.id === id);

  if (!product) {
    return res.status(404).json({
      message: "Product not found",
    });
  }

  res.json(product);
});

// Update Product
app.put("/api/products/:id", (req, res) => {
  const id = Number(req.params.id);

  const product = products.find((p) => p.id === id);

  if (!product) {
    return res.status(404).json({
      message: "Product not found",
    });
  }

  product.title = req.body.title ?? product.title;
  product.price = req.body.price ?? product.price;
  product.category = req.body.category ?? product.category;
  product.image = req.body.image ?? product.image;

  res.json({
    message: "Product Updated",
    product,
  });
});

// Delete Product
app.delete("/api/products/:id", (req, res) => {
  const id = Number(req.params.id);

  const index = products.findIndex((p) => p.id === id);

  if (index === -1) {
    return res.status(404).json({
      message: "Product not found",
    });
  }

  const deletedProduct = products.splice(index, 1)[0];

  res.json({
    message: "Product Deleted",
    product: deletedProduct,
  });
});

// Filter Products
app.get("/api/products/filter", (req, res) => {
  const { category } = req.query;

  const filtered = products.filter(
    (p) => p.category === category
  );

  res.json(filtered);
});

// Sort Products
app.get("/api/products/sort", (req, res) => {
  const sorted = [...products].sort(
    (a, b) => a.price - b.price
  );

  res.json(sorted);
});

// Register User
app.post("/api/users/register", (req, res) => {
  users.push(req.body);

  res.status(201).json({
    message: "User Registered",
  });
});

// Login User
app.post("/api/users/login", (req, res) => {
  const user = users.find(
    (u) =>
      u.email === req.body.email &&
      u.password === req.body.password
  );

  if (!user) {
    return res.status(401).json({
      message: "Invalid Credentials",
    });
  }

  res.json({
    message: "Login Success",
  });
});

// Admin Login
app.post("/api/admin/login", (req, res) => {
  const { email, password } = req.body;

  if (
    email === "admin@gmail.com" &&
    password === "admin123"
  ) {
    return res.json({
      message: "Admin Login Success",
    });
  }

  res.status(401).json({
    message: "Invalid Admin",
  });
});

// Create Order
app.post("/api/orders", (req, res) => {
  const newOrder = {
    id: orders.length + 1,
    ...req.body,
  };

  orders.push(newOrder);

  res.status(201).json({
    message: "Order Created",
    order: newOrder,
  });
});

// Get Orders
app.get("/api/orders", (req, res) => {
  res.json(orders);
});

app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});