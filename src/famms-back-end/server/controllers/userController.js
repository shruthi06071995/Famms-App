import User from "../models/userModel.js";
import generateToken from "../utils/generateToken.js";
import validator from "validator";

// @route  POST /api/users/register
export const registerUser = async (req, res) => {

  const { name, email, password } = req.body;

  if (!name || !email || !password) {

    return res.status(400).json({ message: "Please fill all fields" });
  }

  const userExists = await User.findOne({ email });

  if (userExists) {

    return res.status(400).json({ message: "User already exists" });
  }

  const user = await User.create({ name, email, password });

  res.status(201).json({
    _id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
    token: generateToken(user._id),
  });
};

// @route  POST /api/users/login
export const loginUser = async (req, res) => {

  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      message: "Please enter email and password",
    });
  }

  if (!validator.isEmail(email)) {
    return res.status(400).json({
      message: "Invalid email format",
    });
  }

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {

    return res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: generateToken(user._id),
    });

  }

  return res.status(401).json({
    message: "Invalid email or password",
  });

};

// @route  PUT /api/users/profile
// @access Private

export const updateUserProfile = async (req, res) => {
  try {
    console.log("User ID:", req.user._id);
    console.log("Request Body:", req.body);

    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    user.phone = req.body.phone || user.phone;
    user.address = req.body.address || user.address;
    user.city = req.body.city || user.city;
    user.state = req.body.state || user.state;
    user.pincode = req.body.pincode || user.pincode;

    const updatedUser = await user.save();

    console.log(updatedUser);

    res.json({
      message: "Address updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: error.message,
    });
  }
};

// @route GET /api/users/profile
// @access Private

export const getUserProfile = async (req, res) => {

  const user = await User.findById(req.user._id);

  if (!user) {
    return res.status(404).json({
      message: "User not found",
    });
  }

  res.json({
    name: user.name,
    email: user.email,
    phone: user.phone,
    address: user.address,
    city: user.city,
    state: user.state,
    pincode: user.pincode,
  });

};

// Add Product to Wishlist
export const addToWishlist = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    const productId = req.params.id;

    if (!user.wishlist.includes(productId)) {
      user.wishlist.push(productId);
      await user.save();
    }

    res.json({
      message: "Added to wishlist",
      wishlist: user.wishlist,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Remove Product from Wishlist
export const removeFromWishlist = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    user.wishlist = user.wishlist.filter(
      (item) => item.toString() !== req.params.id
    );

    await user.save();

    res.json({
      message: "Removed from wishlist",
      wishlist: user.wishlist,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Get Wishlist
// Get Wishlist

export const getWishlist = async (req, res) => {
  try {

    const user = await User.findById(req.user._id)
      .populate("wishlist");

    res.json(user.wishlist);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};

// Get All Users (Admin)

export const getUsers = async (req, res) => {

  try {

    const users = await User.find({});

    res.json(users);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }

};