import mongoose from "mongoose";

const medicineSchema = new mongoose.Schema({
    type: { type: String},
    animal: { type: String},
    name: { type: String, required: true },
    price: { type: Number, required: true },
    img: { type: String },
    desc: { type: String },
}, { collection: "Medicine", timestamps: true });

const MMedicine = mongoose.model("Medicine", medicineSchema);
export default MMedicine;