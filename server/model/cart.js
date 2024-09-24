import mongoose from "mongoose";
const cartSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  items: [{
    dish: { type: mongoose.Schema.Types.ObjectId, ref: 'Dish' },
    quantity: { type: Number, default: 1 }
  }],
  totalPrice: { type: Number, required: true  }
});

const Cart = mongoose.model('Cart', cartSchema) || mongoose.models.carts;

export default Cart;