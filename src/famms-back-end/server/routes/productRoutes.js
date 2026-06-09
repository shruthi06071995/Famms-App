import express from "express";
import productsData from "../../data/productsData.js";

const router = express.Router();

router.get("/", (req, res) => {
  res.json(productsData);
});

router.get("/:id", (req, res) => {
  const product = productsData.find(
    (item) => item.id === Number(req.params.id)
  );

  if (!product) {
    return res.status(404).json({
      message: "Product not found",
    });
  }

  res.json(product);
});

export default router;