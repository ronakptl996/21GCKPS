import { Router } from "express";
import {
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
router.route("/register").post(
  upload.fields([
    { name: "headOfFamilyAvatar", maxCount: 1 },
    { name: "wifeAvatar", maxCount: 1 },
    { name: "sonAvatars", maxCount: 5 }, // Assuming a maximum of 5 sons
    { name: "daughterAvatars", maxCount: 5 },
  ]),
  registerFamily
);
router.route("/login").post(loginUser);

router.route("/logout").post(verifyJwt, logoutUser);

export default router;
