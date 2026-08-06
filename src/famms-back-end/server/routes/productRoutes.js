import express from "express";

import products from "../../data/productsData.js";

import { getProducts, getProductById, createProduct, updateProduct, deleteProduct, searchProducts, sortProducts, filterProducts } from "../controllers/productController.js";
import { protect } from "../middleware/authMiddware.js";

const router = express.Router();

router.get("/", getProducts);

router.get("/search", searchProducts);

router.get("/sort/price", (req, res) => {
  const sortedProducts = [...products].sort(
    (a, b) => a.price - b.price
  );
  res.json(sortedProducts);
});

router.get("/filter/category", (req, res) => {
  const { category } = req.query;

  const filteredProducts = products.filter(
    product =>
      product.category.toLowerCase() ===
      category.toLowerCase()
  );

  res.json(filteredProducts);
});

router.get("/:id", getProductById);

router.post("/", protect, createProduct);

router.put("/:id", protect, updateProduct);

router.delete("/:id", protect, deleteProduct);

export default router;