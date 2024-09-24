import mongoose from "mongoose";
const restaurantSchema = new mongoose.Schema({
  user:{
    type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true  
  },
  name: { type: String, required: true },
  location: String,
  tags: [String], // e.g., 'Fast Food', 'Italian', etc.
  dishes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Dish' }],
  poster:String,
},{
  timestamps:true,
});

const Restaurant = mongoose.model('Restaurant', restaurantSchema) || mongoose.models.restaurants;

export default Restaurant