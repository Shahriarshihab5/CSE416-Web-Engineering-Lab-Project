import express from "express";
import MMedicine from "../models/Medicine.js"; // Ensure your model is correctly imported

const router = express.Router();

router.get("/get-all-medicines", async (req, res) => {
    try {
        const medicines = await MMedicine.find();

        if (!medicines || medicines.length === 0) {
            return res.status(404).json({ message: "No medicines found" });
        }

        res.status(200).json(medicines);
    } catch (error) {
        console.error("Error fetching medicines:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

export default router;