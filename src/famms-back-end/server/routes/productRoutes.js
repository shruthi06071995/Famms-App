import express from "express";

import products from "../../data/productsData.js";

import {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  searchProducts,
  sortProducts,
  filterProducts,
} from "../controllers/productController.js";

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

router.post("/", createProduct);

router.put("/:id", updateProduct);

router.delete("/:id", deleteProduct);

// router.get("/sort/price", (req, res) => {

//   const order = req.query.order;

//   const sorted = [...products].sort(
//     (a, b) =>
//       order === "desc"
//         ? b.price - a.price
//         : a.price - b.price
//   );

//   res.json(sorted);

// });

// router.get("/filter/category", (req, res) => {

//   const category = req.query.category;

//   const filtered = products.filter(
//     p =>
//       p.category.toLowerCase()
//       === category.toLowerCase()
//   );

//   res.json(filtered);

// });

export default router;