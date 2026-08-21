import express from "express";

import { getProducts, getProductById, createProduct, updateProduct, deleteProduct, searchProducts, sortProducts, filterProducts } from "../controllers/productController.js";
import { protect, admin } from "../middleware/authMiddware.js";

const router = express.Router();

router.get("/", getProducts);

router.get("/search", searchProducts);

router.get("/sort/price", sortProducts);

router.get("/filter/category", filterProducts);

router.get("/:id", getProductById);

router.post("/", protect, admin, createProduct);

router.put("/:id", protect, admin, updateProduct);

router.delete("/:id", protect, admin, deleteProduct);

export default router;