import mongoose from "mongoose";

const medicineSchema = new mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    image: { type: String },
}, { collection: "Medicine", timestamps: true });

const MMedicine = mongoose.model("Medicine", medicineSchema);
export default MMedicine;