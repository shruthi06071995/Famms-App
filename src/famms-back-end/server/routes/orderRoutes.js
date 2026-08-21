import express from "express";
import { createOrder, getOrders, getMyOrders, markOrderDelivered } from "../controllers/orderController.js";
import { admin, protect } from "../middleware/authMiddware.js";

const router = express.Router();

// Create Order
router.post("/", protect, createOrder);

//Get Order
router.get("/", protect, admin, getOrders);

router.get("/myorders", protect, getMyOrders);

router.put("/:id/deliver", protect, admin, markOrderDelivered);

export default router;