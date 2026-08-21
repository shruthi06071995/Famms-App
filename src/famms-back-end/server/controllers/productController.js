import Product from "../models/productModel.js";
import asyncHandler from "express-async-handler";

// GET ALL PRODUCTS
export const getProducts = asyncHandler(async (req, res) => {

  const products = await Product.find();
  res.json(products);

});

// GET SINGLE PRODUCT
export const getProductById = asyncHandler(async (req, res) => {

  const product = await Product.findById(req.params.id);

  if (!product) {
    res.status(404);
    throw new Error("Product not found");
  }

  res.json(product);

});

// CREATE PRODUCT
export const createProduct = asyncHandler(async (req, res) => {

  const createdProduct = await Product.create(req.body);

  res.status(201).json(createdProduct);

});

// UPDATE PRODUCT
export const updateProduct = asyncHandler(async (req, res) => {

  const product = await Product.findById(req.params.id);

  if (!product) {
    res.status(404);
    throw new Error("Product not found");
  }

  Object.assign(product, req.body);

  const updatedProduct = await product.save();

  res.json(updatedProduct);

});

// DELETE PRODUCT
export const deleteProduct = asyncHandler(async (req, res) => {

  const product = await Product.findById(req.params.id);

  if (!product) {
    res.status(404);
    throw new Error("Product not found");
  }

  await product.deleteOne();

  res.json({ message: "Product deleted" });

});

// SEARCH PRODUCTS
export const searchProducts = asyncHandler(async (req, res) => {

  const keyword = req.query.keyword || "";

  const products = await Product.find({
    title: {
      $regex: keyword,
      $options: "i"
    }
  });

  res.json(products);

});

// FILTER PRODUCTS
export const filterProducts = asyncHandler(async (req, res) => {

  const { category } = req.query;

  if (!category) {
    return res.status(400).json({
      message: "Category is required",
    });
  }

  const products = await Product.find({ category });

  res.json(products);

});

// SORT PRODUCTS
export const sortProducts = asyncHandler(async (req, res) => {

  const order = req.query.order === "desc" ? -1 : 1;

  const products = await Product.find().sort({
    price: order,
  });

  res.json(products);

});