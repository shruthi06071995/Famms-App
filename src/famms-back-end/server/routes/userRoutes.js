import express from "express";
import { registerUser, loginUser, updateUserProfile, getUserProfile, addToWishlist, removeFromWishlist, getWishlist, getUsers } from "../controllers/userController.js";
import { protect, admin } from "../middleware/authMiddware.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.put("/profile", protect, updateUserProfile);
router.get("/profile", protect, getUserProfile);

router.get("/wishlist", protect, getWishlist);
router.post("/wishlist/:id", protect, addToWishlist);
router.delete("/wishlist/:id", protect, removeFromWishlist);

router.get("/", protect, admin, getUsers);

export default router;