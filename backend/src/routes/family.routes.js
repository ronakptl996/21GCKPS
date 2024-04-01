import { Router } from "express";
import {
  changePassword,
  findUserWithPhoneNumber,
  getUser,
  getUserDetails,
  loginUser,
  logoutUser,
  registerFamily,
  updateUserProfile,
  verifyOtp,
} from "../controllers/family.controller.js";
import { verifyJwt } from "../middlewares/auth.middleware.js";
import { upload, awsUploadMulter } from "../middlewares/multer.middleware.js";

const router = Router();


// Update User Profile
router.route("/profile/update/:id").post(verifyJwt, updateUserProfile);

router.route("/").get(verifyJwt, getUserDetails);
router.route("/profile/:id").get(verifyJwt, getUser);
router.route("/register").post(awsUploadMulter.any(), registerFamily);
router.route("/login").post(loginUser);
router.route("/logout").post(verifyJwt, logoutUser);
router.route("/verify-otp").post(verifyOtp);
router.route("/forgot-password").post(changePassword);
router.route("/:phone").post(findUserWithPhoneNumber);


export default router;
