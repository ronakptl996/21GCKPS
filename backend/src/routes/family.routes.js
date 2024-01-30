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
import { upload } from "../middlewares/multer.middleware.js";

const router = Router();

router.route("/").get(verifyJwt, getUserDetails);
router.route("/profile/:id").get(verifyJwt, getUser);
router.route("/register").post(upload.any(), registerFamily);
router.route("/login").post(loginUser);
router.route("/:phone").post(findUserWithPhoneNumber);
router.route("/logout").post(verifyJwt, logoutUser);

export default router;
