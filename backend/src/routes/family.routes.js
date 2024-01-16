import { Router } from "express";
import {
  getUserDetails,
  loginUser,
  logoutUser,
  registerFamily,
} from "../controllers/family.controller.js";
import { verifyJwt } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/").get(getUserDetails);
router.route("/register").post(registerFamily);
router.route("/login").post(loginUser);

router.route("/logout").post(verifyJwt, logoutUser);

export default router;
