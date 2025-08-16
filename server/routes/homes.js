import express from "express";
import Pet from "../models/Home.js";

const router = express.Router();

// GET all pets
router.get("/", async (req, res) => {
  try {
    const pets = await Pet.find();

    if (!pets || pets.length === 0) {
      return res.status(404).json({ message: "No pets found" });
    }

    // If pets exist
    res.status(200).json(pets);

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

export default router;
