import Order from "../models/orderModel.js";

// @desc    Create new order
// @route   POST /api/orders
// @access  Private

export const createOrder = async (req, res) => {
  try {

    const {
      orderItems,
      shippingAddress,
      totalPrice,
    } = req.body;

    const order = new Order({
      user: req.user._id,
      orderItems,
      shippingAddress,
      totalPrice,
    });

    const createdOrder = await order.save();

    res.status(201).json(createdOrder);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};

// @desc Get Logged-in User Orders
// @route GET /api/orders/myorders
// @access Private

export const getMyOrders = async (req, res) => {

  const orders = await Order.find({
    user: req.user._id,
  }).sort({
    createdAt: -1,
  });

  res.json(orders);

};

// @desc    Get all orders
// @route   GET /api/orders
// @access  Admin

export const getOrders = async (req, res) => {
  try {

    const orders = await Order.find({})
      .populate("user", "name email");

    res.json(orders);

  } catch (error) {

    console.log("ORDER ERROR:");
    console.log(error);

    res.status(500).json({
      message: error.message,
    });

  }
};

// @desc    Mark order as delivered
// @route   PUT /api/orders/:id/deliver
// @access  Admin

export const markOrderDelivered = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({
        message: "Order not found",
      });
    }

    order.isDelivered = true;

    await order.save();

    res.json({
      message: "Order marked as delivered",
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};