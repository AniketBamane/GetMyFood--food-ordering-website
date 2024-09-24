import mongoose from "mongoose";
const dishSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  price: { type: Number, required: true },
  restaurant: { type: mongoose.Schema.Types.ObjectId, ref: 'Restaurant', required: true },
  imageUrl: String, // For storing the image URL of the dish
});

const Dish = mongoose.model('Dish', dishSchema) || mongoose.models.dishs;

export default Dish