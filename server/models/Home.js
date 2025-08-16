import mongoose from "mongoose";

const petSchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: { type: String, required: true },
  breed: { type: String },
  year: { type: Number },
  gender: { type: String },
  price: { type: Number },
  image: { type: String }
});

const Pet = mongoose.model("Pet", petSchema);

export default Pet;
