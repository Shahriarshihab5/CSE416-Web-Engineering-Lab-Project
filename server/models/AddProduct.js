import mongoose from "mongoose";

const addProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: String, enum: ["food", "medicine"], required: true },
  image: { type: String },
}, { timestamps: true });

// Fix: Use the schema variable name correctly
const Product = mongoose.model("addProduct", addProductSchema);
export default Product;
