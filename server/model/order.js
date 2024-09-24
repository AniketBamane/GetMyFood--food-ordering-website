import mongoose from "mongoose";
const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  items: [{
    dish: { type: mongoose.Schema.Types.ObjectId, ref: 'Dish' },
    quantity: { type: Number, default: 1 }
  }],
  totalPrice: { type: Number, required: true },
  deliveryDate: { 
    type: Date, 
    default: () => Date.now() + 24*60*60*1000 
  },
  deliveryAddress:{
    street: String,
    city: String,
    state: String,
    pincode: String,
    building:String,
    landmark: String,
    country: String
  },
  status: { type: String,
    enum:["pending","in-delivery","completed","rejected"], 
    default: 'pending' },
  payment: { 
    type: String, 
    enum: ["pending","paid","cancelled"], 
    default: 'pending' 
  }
}, {
  timestamps: true, // Created and updated timestamps
});

const Order = mongoose.model('Order', orderSchema) || mongoose.models.orders;

export default Order;
