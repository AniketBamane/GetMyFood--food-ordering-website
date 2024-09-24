import express from 'express';
import { getCurrentUser, login, logout, signup, updateProfile, verifyEmail } from '../controller/auth.js';
import checkAuthentication from '../middleware/authorize.js';

const router = express.Router()

router.route("/signup").post(signup)

router.route("/login").post(login)

router.route("/verify-email").post(verifyEmail)

router.route('/logout').get(logout)

router.route("/update-profile").put(checkAuthentication,updateProfile)

router.route("/getCurrentUser").get(checkAuthentication,getCurrentUser)

export default router