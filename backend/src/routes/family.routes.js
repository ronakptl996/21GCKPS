import { Router } from "express";
import {
  addSonDaughterDetails,
  changePassword,
  deleteSonDaughterDetails,
  findUserWithPhoneNumber,
  getUser,
  getUserDetails,
  loginUser,
  logoutUser,
  registerFamily,
  updateProfileImages,
  updateUserProfile,
  verifyOtp,
  villageFamilyData,
  villageWiseData,
} from "../controllers/family.controller.js";
import { verifyJwt } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = Router();

// Update User Profile
router
  .route("/update-image")
  .post(upload.single("avatar"), verifyJwt, updateProfileImages);
router.route("/profile/update/:id").post(verifyJwt, updateUserProfile);
router
  .route("/profile/add-new-son-daughter")
  .post(verifyJwt, upload.single("avatar"), addSonDaughterDetails);
router.route("/").get(verifyJwt, getUserDetails);
router.route("/profile/:id").get(verifyJwt, getUser);
router.route("/register").post(upload.any(), registerFamily);
router
  .route("/delete-son-daughter")
  .delete(verifyJwt, deleteSonDaughterDetails);

router.route("/login").post(loginUser);
router.route("/logout").post(verifyJwt, logoutUser);
router.route("/verify-otp").post(verifyOtp);
router.route("/forgot-password").post(changePassword);
router.route("/:phone").post(findUserWithPhoneNumber);

// Get Village wise data
router.route("/village").get(verifyJwt, villageWiseData);
router.route("/village/:villageName").get(villageFamilyData);

export default router;
