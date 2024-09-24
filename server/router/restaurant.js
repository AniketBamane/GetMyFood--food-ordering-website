import express from 'express';
import { createRestaurant, deleteRestaurant, getOrders, getRestaurantById, getRestaurants, getRestaurantsByLocation, updateRestaurant } from '../controller/restaurant.js';
import checkAuthentication from '../middleware/authorize.js';
import upload from '../config/multer.js';

const router = express.Router()

router.route("/createRestaurant").post(checkAuthentication,upload,createRestaurant)

router.route("/updateRestaurant/:id").put(checkAuthentication,upload,updateRestaurant)

router.route("/deleteRestaurant/:id").delete(checkAuthentication,deleteRestaurant)

router.route("/getRestaurants").get(checkAuthentication,getRestaurants)

router.route("/getRestaurant/:id").get(checkAuthentication,getRestaurantById)

router.route("/getOrders").get(checkAuthentication,getOrders)

router.route("/getRestaurantsByLocation").get(checkAuthentication,getRestaurantsByLocation)

export default router