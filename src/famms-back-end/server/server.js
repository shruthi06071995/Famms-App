import express from "express";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);
app.use("/api/orders", orderRoutes);


const app = express();

app.use(cors());
app.use(express.json());


app.get("/api/products", (req, res) => {
  res.json(products);
});

// Add Product API 
app.post("/products", (req, res) => {
  products.push(req.body);

  res.json({
    message: "Product Added",
  });
});

// Add Update Product API 
app.put("/products/:id", (req, res) => {
  const id = Number(req.params.id);

  const product = products.find((p) => p.id === id);

  if (!product) {
    return res.status(404).json({
      message: "Product not found",
    });
  }

  product.title = req.body.title;
  product.price = req.body.price;

  res.json({
    message: "Product Updated",
  });
});

// Add Delete Product API 
app.delete("/products/:id", (req, res) => {
  const id = Number(req.params.id);

  const index = products.findIndex((p) => p.id === id);

  if (index === -1) {
    return res.status(404).json({
      message: "Product not found",
    });
  }

  products.splice(index, 1);

  res.json({
    message: "Product Deleted",
  });
});

// Get Product Details 
app.get("/products/:id", (req, res) => {
  const id = Number(req.params.id);

  const product = products.find((p) => p.id === id);

  if (!product) {
    return res.status(404).json({
      message: "Product not found",
    });
  }

  res.json(product);
});

// Filter Products 
app.get("/filter", (req, res) => {
  const category = req.query.category;

  const filtered = products.filter(
    (p) => p.category === category
  );

  res.json(filtered);
});

// Sort Products 
app.get("/sort", (req, res) => {
  const sorted = [...products].sort(
    (a, b) => a.price - b.price
  );

  res.json(sorted);
});

app.get("/sort", (req, res) => {
  const sorted = [...products].sort(
    (a, b) => a.price - b.price
  );

  res.json(sorted);
});

// User Authentication 

// Register 
app.post("/register", (req, res) => {
  users.push(req.body);

  res.json({
    message: "User Registered",
  });
});

// Login 
app.post("/login", (req, res) => {
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
app.post("/admin/login", (req, res) => {
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

// *Order API*

// Create Order 
app.post("/orders", (req, res) => {
  orders.push(req.body);

  res.json({
    message: "Order Created",
  });
});

// Get Order 
app.get("/orders", (req, res) => {
  res.json(orders);
});

app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});