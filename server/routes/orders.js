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

export default router;
