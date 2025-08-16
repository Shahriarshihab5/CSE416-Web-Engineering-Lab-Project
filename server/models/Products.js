import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  animal: { type: String },
  image: { type: String }
}, { collection: "Product",timestamps: true });

const MProduct = mongoose.model("Product", productSchema);
export default MProduct;
