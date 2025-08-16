import mongoose from "mongoose";

// Product schema
const productSchema = new mongoose.Schema({
  id: { type: String, required: true },
  name: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String },
  quantity: { type: Number, required: true },
});

// Customer schema
const customerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String },
  address: { type: String },
});

// Order schema
const orderSchema = new mongoose.Schema({
  customer: { type: customerSchema, required: true },
  products: { type: [productSchema], required: true },
  totalAmount: { type: Number, required: true },
}, { timestamps: true });

// Model: MOrder, Collection: "Order"
const MOrder = mongoose.model("Order", orderSchema);

export default MOrder;
