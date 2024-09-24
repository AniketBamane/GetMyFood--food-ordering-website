import Dish from "../model/dish.js";
import User from "../model/user.js";
export const addItemIntoCart = async(req,res,next)=>{
  try{
    const {dishId} = req.body
    const user = req.user;
    const dish = await Dish.findById(dishId);
    if(!dish) return res.status(404).json({message: "Dish not found"});
    const currentUser = await User.findById(user.id).populate("cart.dishes.dish");
    console.log(currentUser.cart.dishes)
    if(currentUser.cart.dishes.some(object=> object.dish._id.equals(dishId))){
      return res.status(400).json({message: "Item already exists in cart"});
    }
    currentUser.cart.dishes.push({dish:dish._id,quantity:1})
    currentUser.cart.totalPrice += dish.price;
    await currentUser.save();
    const newUser = await User.findById(user.id).populate("cart.dishes.dish")
    return res.status(201).json({message: "Item added to cart",cart:newUser.cart});
  }catch(err){
    res.status(500).json({message: err.message});
  }
}

export const removeItemFromCart = async(req, res, next) => {
try{
  const { dishID } = req.body;
  const user = req.user;
  const dish = await Dish.findById(dishID);
  const currentUser = await User.findById(user.id);
  const dishIndex = currentUser.cart.dishes.findIndex((dish) => dish.dish.toString() === dishID.toString());
  if(dishIndex === -1) {
    return res.status(404).json({message: "Dish not found in cart"});
  } else {
    currentUser.cart.dishes.splice(dishIndex, 1);
    currentUser.cart.totalPrice -= dish.price;
    await currentUser.save();
    const newUser = await User.findById(currentUser._id).populate("cart.dishes.dish")
    return res.status(200).json({message: "Item removed from cart",cart:newUser.cart});
  }
}catch(err){
  res.status(500).json({message: err.message});
}
}

export const  increaseQuantityOfDishInCart = async(req,res,next)=>{
  try{
    const {dishID,quantity} = req.body
    const user = req.user;
    const currentUser = await User.findById(user.id);
    const dish = await Dish.findById(dishID);
    if(!dish) return res.status(404).json({message: "Dish not found"});
    const dishIndex = currentUser.cart.dishes.findIndex((dish) => dish.dish._id.toString() === dishID.toString());
    if(dishIndex === -1) {
      return res.status(404).json({message: "Dish not found in cart"});
    } else{
      const previousQuantity = currentUser.cart.dishes[dishIndex].quantity
      currentUser.cart.dishes[dishIndex].quantity = quantity
      currentUser.cart.totalPrice -= previousQuantity * dish.price;
      currentUser.cart.totalPrice += quantity * dish.price;
      await currentUser.save();
      const newUser = await User.findById(currentUser._id).populate("cart.dishes.dish")
      return res.status(200).json({message: "Quantity increased for dish ",cart:newUser.cart});
    }
  }catch(err){
    res.status(500).json({message: err.message});
  }
}

export const decreaseQuantityOfDishInCart = async(req,res,next)=>{
  try{
    const {dishID,quantity} = req.body
    const user = req.user;
    const currentUser = await User.findById(user.id);
    const dish = await Dish.findById(dishID);
    if(!dish) return res.status(404).json({message: "Dish not found"});
    const dishIndex = currentUser.cart.dishes.findIndex((dish) => dish.dish.toString() === dishID.toString());
    if(dishIndex === -1) {
      return res.status(404).json({message: "Dish not found in cart"});
    } else if(currentUser.cart.dishes[dishIndex].quantity < quantity){
      return res.status(400).json({message: "Quantity cannot be decreased further"});
    } else{
      const previousQuantity = currentUser.cart.dishes[dishIndex].quantity
      currentUser.cart.dishes[dishIndex].quantity = quantity
      currentUser.cart.totalPrice -= (previousQuantity - quantity) * dish.price;
      await currentUser.save();
      const newUser = await User.findById(currentUser._id).populate("cart.dishes.dish")
      return res.status(200).json({message: "Quantity decreased for dish ",cart: newUser.cart})
    }
  }catch(err){
    res.status(500).json({message: err.message});
  }
}

export const deleteCart = async(req,res,next)=>{
  try{
    const user = req.user;
    const currentUser = await User.findById(user.id);
    currentUser.cart.dishes = []
    currentUser.cart.totalPrice = 0
    await currentUser.save();
    return res.status(200).json({message: "Cart deleted successfully"});
  }catch(err){
    res.status(500).json({message: err.message});
  }
}



// in frontend i have to send the quantity user has increased or decreased for exmaple if first quantity is 1 and user made it 3 then quantity to be sent to server will be 2 same with decreased