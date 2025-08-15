import express from "express";
import {MUser} from "../models/Users.js";

const router = express.Router();

router.get("/", async (req, res) => {
  return res.status(200).json({ message: "Backend API is working" });
});



router.post("/register", async (req, res) => {
  const { name, email } = req.body;
  console.log("Received user data:", { name, email });

  if (!name || !email) {
    return res.status(400).json({ message: "Name and email are required" });
  }

  try {
    const existingUser = await MUser.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const newUser = new MUser({ name, email });
    await newUser.save();

    res.status(201).json({ message: "User saved successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
