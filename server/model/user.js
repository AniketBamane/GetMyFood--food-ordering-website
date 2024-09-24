import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  address:{
    street: String,
    city: String,
    state: String,
    pincode: String,
    building:String,
    landmark: String,
    country: String
  },
  isAdmin: { type: Boolean, default: false },
  cart:{
    dishes: [{
      dish: { type: mongoose.Schema.Types.ObjectId, ref: 'Dish' },
      quantity: { type: Number, default: 1 }
    }],
    totalPrice: { type: Number, default: 0 }
  }
},{
  timestamps:true
});

userSchema.pre('save',async function(next){
  const user = this;
  if(!user.isModified('password')){
    return next();
  }
  const salt = await bcrypt.genSalt(10)
  const password =await bcrypt.hash(user.password,salt)
  user.password = password;
  next();
})

userSchema.methods.generateToken = async function() {
  const user = this;
  const token =await jwt.sign({id: user._id}, process.env.JWT_SECRET, { expiresIn: '7d'});
  return token;
}

userSchema.methods.comparePassword = async function(password) {
  const user = this;
  const isMatch = await bcrypt.compare(password, user.password);
  return isMatch;
}

const User = mongoose.model('User', userSchema) || mongoose.models.users;

export default User;
