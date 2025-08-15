// models/User.js
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
}, { collection: "User", timestamps: true });




export const  MUser = mongoose.model("User", userSchema);




