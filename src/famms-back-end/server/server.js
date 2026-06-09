import express from "express";
import cors from "cors";

import productRoutes from "./routes/productRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/products", productRoutes);

app.get("/", (req, res) => {
  res.send("Famms API Running");
});

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});