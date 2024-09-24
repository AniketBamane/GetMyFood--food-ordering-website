import express from 'express';
import { createOrder, deleteOrder, getOrders, updateOrder } from '../controller/order.js';
import checkAuthentication from '../middleware/authorize.js';

const router = express.Router()

router.route("/createOrder").post(checkAuthentication,createOrder)

router.route("/getOrders").get(checkAuthentication,getOrders)

router.route("/deleterOrder/:id").delete(checkAuthentication,deleteOrder)

router.route("/updateOrder/:id").put(checkAuthentication,updateOrder)


export default router