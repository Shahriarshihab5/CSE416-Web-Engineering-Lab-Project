import express from "express";
import User from "../models/User.js"; // Mongoose model

const router = express.Router();

// POST /api/users/register
router.post("/register", async (req, res) => {
    const { name, email } = req.body;

    if (!name || !email) {
        return res.status(400).json({ message: "Name and email are required" });
    }

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) return res.status(400).json({ message: "User already exists" });

        const newUser = new User({ name, email });
        await newUser.save();

        res.status(201).json({ message: "User saved successfully" });
    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
});

export default router;
