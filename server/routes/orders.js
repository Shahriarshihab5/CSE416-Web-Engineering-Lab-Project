import express from "express";
import MOrder from '../models/Order.js'

const router = express.Router();

// POST new order
router.post("/create-order", async (req, res) => {
  try {
    const { customer, products, totalAmount } = req.body;

    // Create new customer order
    const newOrder = new MOrder({ customer, products, totalAmount });
    const savedOrder = await newOrder.save();

    res.status(201).json({ message: "Order created successfully", data: savedOrder });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});


// Get order summary (total orders + revenue)
router.get("/get-order-info", async (req, res) => {
  try {
    // Fetch all orders
    const orders = await MOrder.find();

    // Count total orders
    const totalOrders = orders.length;

    // Sum all order amounts (assuming each order has a `totalAmount` field)
    const totalAmount = orders.reduce((sum, order) => sum + (order.totalAmount || 0), 0);

    res.json({
      success: true,
      totalOrders,
      totalAmount,
      orders
    });
  } catch (error) {
    console.error("Error fetching order info:", error);
    res.status(500).json({
      success: false,
      message: "Server error while fetching order info",
    });
  }
});

export default router;
