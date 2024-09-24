import { uploadFileOnCloudinary } from "../config/cloudinary.js";
import Dish from "../model/dish.js";
import Restaurant from "../model/restaurant.js"
export const createDish = async(req,res,next) => {
  try{
    const { name, description, price, restaurantId } = req.body;
    const imageUrl = req.file
    const restaurant = await Restaurant.findById(restaurantId);
    if(!restaurant) return res.status(404).json({message: "Restaurant not found"});
    const image = await uploadFileOnCloudinary(imageUrl)
    const dish = new Dish({ name, description, price, restaurant: restaurant._id, imageUrl:image });
    await dish.save();
    restaurant.dishes.push(dish._id);
    await restaurant.save();
    res.status(201).json({message:"dish created Successfully !",dish});
  }catch(err){
    res.status(500).json({message: err.message});
  }
}

export const deleteDish = async(req,res,next) => {
  try{
    const dish = await Dish.findById(req.params.id);
    if(!dish) return res.status(404).json({message: "Dish not found"});
    const restaurant = await Restaurant.findById(dish.restaurant)
    if(!restaurant) return res.status(404).json({message: "Restaurant not found"});
    restaurant.dishes.pull(dish._id);
    await Dish.findByIdAndDelete(dish._id)
    await restaurant.save();
    res.status(200).json({message: "Dish deleted successfully!"});
  }catch(err){
    res.status(500).json({message: err.message});
  }
}

export const updateDish = async(req,res,next) => {
  try{
    const { name, description, price } = req.body;
    const {id} = req.params
    const imageUrl =req.file
    const dish =await Dish.findById(id)
    if(!dish) return res.status(404).json({message: "Dish not found"});
    if(name) dish.name = name ;
    if(description) dish.description = description;
    if(price) dish.price = price;
    if(imageUrl) dish.imageUrl = await uploadFileOnCloudinary(imageUrl);
    await dish.save();
    res.status(200).json({message:"Dish updated successfully",dish});
  }catch(err){
    res.status(500).json({message: err.message});
  }
}

export const getDishesByRestaurant = async(req, res, next) => {
  try{
    const { restaurantId } = req.params;
    const dishes = await Dish.find({ restaurant: restaurantId });
    if(!dishes) return res.status(404).json({message: "Dishes not found!",dishes: []});
    res.status(200).json({dishes});
  }catch(err){
    res.status(500).json({message: err.message});
  }
}