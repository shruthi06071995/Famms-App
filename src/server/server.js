const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());

// Simple product data (no database)
const products = [
  { id: 1, name: "Shirt", price: 500, category: "men" },
  { id: 2, name: "Dress", price: 800, category: "women" },
  { id: 3, name: "Shoes", price: 1200, category: "men" },
];

// API route
app.get("/api/products", (req, res) => {
  res.json(products);
});

// start server
app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});