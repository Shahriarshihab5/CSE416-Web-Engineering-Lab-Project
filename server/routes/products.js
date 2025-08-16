import express from "express";
import MProduct from "../models/Products.js"; // Make sure your model is default exported

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


router.delete("/delete-product/:id", async (req, res) => {
  const productId = req.params.id;
  try {
    const deletedProduct = await MProduct.findByIdAndDelete(productId);

    if (!deletedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error("Error deleting product:", error);
    res.status(500).json({ message: "Internal server error" });
  }

});

// update product
router.put("/update-product/:id", async (req, res) => {
  const productId = req.params.id;
  const updatedData = req.body;

  try {
    const updatedProduct = await MProduct.findByIdAndUpdate(productId, updatedData, { new: true });

    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json(updatedProduct);
  } catch (error) {
    console.error("Error updating product:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// get single product by ID
router.get('/get-product/:id', async (req, res) => {
  const productId = req.params.id;

  try {
    const product = await MProduct.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // send the product as JSON
    return res.status(200).json(product);
  } catch (err) {
    console.error("Error fetching product:", err);
    return res.status(500).json({ message: "Server error" });
  }
});


export default router;
