import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";

// Routes
import userRoutes from "./routes/users.js";
import productsRoutes from "./routes/products.js";
import medicineRoutes from "./routes/medicines.js";
import homesRoutes from "./routes/homes.js";
import addProductsRoutes from "./routes/addProducts.js";
import addMedicinesRoutes from "./routes/medicines.js";
import ordersRoutes from './routes/orders.js'
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// API Routes
app.use("/api/users", userRoutes);
app.use("/api/products", productsRoutes);
app.use("/api/medicines", medicineRoutes);
app.use("/api/homes", homesRoutes);
app.use("/api/add-products", addProductsRoutes);
app.use("/api/add-medicines", addMedicinesRoutes);
app.use("/api/order", ordersRoutes);

// Default route
app.get("/", (req, res) => {
  res.send("API is running");
});

// Start the server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
