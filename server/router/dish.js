import express from 'express';
import { createDish, deleteDish, getDishesByRestaurant, updateDish } from '../controller/dish.js';
import checkAuthentication from '../middleware/authorize.js';
import upload from '../config/multer.js';

const router = express.Router()

router.route("/createDish").post(checkAuthentication,upload,createDish)

router.route("/updateDish/:id").put(checkAuthentication,upload,updateDish)

router.route("/deleteDish/:id").delete(checkAuthentication,deleteDish)

router.route('/getDish/:restaurantId').get(checkAuthentication,getDishesByRestaurant)

export default router