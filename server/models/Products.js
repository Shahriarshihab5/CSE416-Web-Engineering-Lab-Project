import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: String,
  price: Number,
  description: String
});

export const MProduct = mongoose.model("Product", productSchema);

