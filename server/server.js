import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import bodyParser from "body-parser";
import userRoutes from "./routes/users.js";
import productsRoutes from "./routes/products.js";
import medicineRoutes from "./routes/medicines.js";


import dotenv from "dotenv";
dotenv.config();


const app = express();
const PORT = process.env.PORT || 5000;

// const PORT = 8000;


app.use(cors());
app.use(bodyParser.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log("MongoDB connection error:", err));

// API routes
app.use("/api/users", userRoutes);
app.use("/api/products", productsRoutes);
app.use("/api/medicines", medicineRoutes);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
