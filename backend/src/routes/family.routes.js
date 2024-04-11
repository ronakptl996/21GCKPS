import { Router } from "express";
import {
  addSonDaughterDetails,
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
import { upload } from "../middlewares/multer.middleware.js";

const router = Router();

// Update User Profile
router.route("/profile/update/:id").post(verifyJwt, updateUserProfile);
router
  .route("/profile/add-new-son-daughter")
  .post(verifyJwt, upload.single("avatar"), addSonDaughterDetails);

router.route("/").get(verifyJwt, getUserDetails);
router.route("/profile/:id").get(verifyJwt, getUser);
router.route("/register").post(upload.any(), registerFamily);
router.route("/login").post(loginUser);
router.route("/logout").post(verifyJwt, logoutUser);
router.route("/verify-otp").post(verifyOtp);
router.route("/forgot-password").post(changePassword);
router.route("/:phone").post(findUserWithPhoneNumber);

export default router;
