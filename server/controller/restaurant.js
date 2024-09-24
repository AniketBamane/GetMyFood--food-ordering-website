import { uploadFileOnCloudinary } from "../config/cloudinary.js";
import Order from "../model/order.js";
import Restaurant from "../model/restaurant.js";

export const createRestaurant = async(req, res, next) =>{
  try{
    const {name,location,tags} = req.body
    const user = req.user
    const imageUrl = req.file
    const image = await uploadFileOnCloudinary(imageUrl)
    const newTags = JSON.parse(tags)
    const restaurant = new Restaurant({name, location, tags:newTags, user: user.id, poster: image });
    await restaurant.save();
    const currentRestaurant = await Restaurant.findById(restaurant._id).populate("dishes")
    res.status(201).json({message:"restaurant created sucessfully !",restaurant:currentRestaurant});
  }catch(err){
    res.status(500).json({message: err.message});
  }
}

export const updateRestaurant = async(req, res, next) => {
  try{
    const {name, location, tags} = req.body
    const imageUrl = req.file
    const user = req.user
    const newTags = JSON.parse(tags)
    const restaurant = await Restaurant.findById(req.params.id)
    if(!restaurant) return res.status(404).json({message: "Restaurant not found"});
    if(restaurant.user.toString()!== user.id) return res.status(401).json({message: "Unauthorized"});
    if(name) restaurant.name= name
    if(location) restaurant.location = location
    if(tags) restaurant.tags = newTags
    if(imageUrl) restaurant.poster = await uploadFileOnCloudinary(imageUrl)
      await restaurant.save()
    res.status(200).json({message: "Restaurant updated successfully", restaurant});
  }catch(err){
    res.status(500).json({message: err.message});
  }
}

export const deleteRestaurant = async(req, res, next) => {
  try{
    const user = req.user
    const restaurant = await Restaurant.findById(req.params.id)
    if(!restaurant) return res.status(404).json({message: "Restaurant not found"});
    if(restaurant.user.toString()!== user.id) return res.status(401).json({message: "Unauthorized"});
    await restaurant.remove()
    res.status(200).json({message: "Restaurant deleted successfully!"});
  }catch(err){
    res.status(500).json({message: err.message});
  }
}


export const getRestaurants = async(req, res, next) => {
  try{
    console.log("in getRestaurants ....")
    const user = req.user
    const restaurants = await Restaurant.find({user: user.id}).populate("user").populate("dishes")
    res.status(200).json({restaurants});
  }catch(err){
    res.status(500).json({message: err.message});
  }
}

export const getRestaurantById = async(req, res, next) => {
  console.log("in getRestaurantById ....")
  try{
    const restaurant = await Restaurant.findById(req.params.id).populate("user").populate("dishes")
    console.log(restaurant)
    if(!restaurant) return res.status(404).json({message: "Restaurant not found"});
    console.log(restaurant)
    res.status(200).json({restaurant});
  }catch(err){
    res.status(500).json({message: err.message});
  }
}

export const getOrders = async(req, res, next) => {
  try{
    const user = req.user;

    // Fetch the user's restaurants by user ID
    const restaurants = await Restaurant.find({ user: user.id }).select("_id");
    
    // Log the restaurant IDs for debugging
    console.log(restaurants.map(r => r._id.toString()), "----------------");
    
    // Fetch all orders and populate the dish information
    const orders = await Order.find({}).populate("items.dish");
    
    // Filter orders to only include items that belong to the user's restaurants
    const filteredOrders = orders.filter(order => 
      order.items.some(item => 
        restaurants.map(r => r._id.toString()).includes(item.dish.restaurant.toString())
      )
    );
    
    // Send the filtered orders in the response
    res.status(200).json({ orders: filteredOrders });
    
  }catch(err){
    res.status(500).json({message:err.message});
  }
}

export const getRestaurantsByLocation = async(req,res)=>{
  try{
    const {q} = req.query
    const restaurants = await Restaurant.find({$or: [
      { location: { $regex: q, $options: 'i' } },
      { name: { $regex: q, $options: 'i' } },
      { tags: { $regex: q, $options: 'i' }}]}).populate("user").populate("dishes")
    if(restaurants){
      res.status(200).json({restaurants})
    } else{
      res.status(200).json({message: "No restaurants found in this location",restaurants:[]})
    }
  }catch(err){
    res.status(500).json({message: err.message})
  }
}