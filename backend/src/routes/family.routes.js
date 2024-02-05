import { Router } from "express";
import {
  findUserWithPhoneNumber,
  getUser,
  getUserDetails,
  loginUser,
  logoutUser,
  registerFamily,
} from "../controllers/family.controller.js";
import { verifyJwt } from "../middlewares/auth.middleware.js";
import { upload, awsUploadMulter } from "../middlewares/multer.middleware.js";

const router = Router();

router.route("/").get(verifyJwt, getUserDetails);
router.route("/profile/:id").get(verifyJwt, getUser);
router.route("/register").post(awsUploadMulter.any(), registerFamily);
router.route("/login").post(loginUser);
router.route("/logout").post(verifyJwt, logoutUser);
router.route("/:phone").post(findUserWithPhoneNumber);

export default router;
