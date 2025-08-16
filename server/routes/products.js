import express from "express";
import MProduct from "../models/Products.js"; // ✅ Make sure your model is default exported

const router = express.Router();

// GET all products
router.get("/get-all-products", async (req, res) => {
  try {
    const products = await MProduct.find();

  

    if (!products || products.length === 0) {
      return res.status(404).json({ message: "No products found" });
    }

    res.status(200).json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

export default router;
