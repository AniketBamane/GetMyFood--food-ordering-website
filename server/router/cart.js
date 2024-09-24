import express from 'express';
import { addItemIntoCart, decreaseQuantityOfDishInCart, deleteCart, increaseQuantityOfDishInCart, removeItemFromCart } from '../controller/cart.js';
import checkAuthentication from '../middleware/authorize.js';

const router = express.Router()

router.route("/addItemIntoCart").post(checkAuthentication,addItemIntoCart)

router.route("/removeItemFromCart").post(checkAuthentication,removeItemFromCart)

router.route("/increaseQuantity").post(checkAuthentication,increaseQuantityOfDishInCart)

router.route("/decreaseQuantity").post(checkAuthentication,decreaseQuantityOfDishInCart)

router.route("/deleteCart").delete(checkAuthentication,deleteCart)

export default router