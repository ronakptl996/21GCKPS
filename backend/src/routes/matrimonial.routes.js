import { Router } from "express";
import { verifyJwt } from "../middlewares/auth.middleware.js";
import {
  addMatrimonial,
  getMatrimonial,
  getUserMatrimonial,
  searchMatrimonialProfile,
} from "../controllers/matrimonial.controller.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = Router();
// Matrimonial Route
router
  .route("/add-matrimonial")
  .post(verifyJwt, upload.single("matrimonialImage"), addMatrimonial);
router.route("/matrimonial").get(verifyJwt, getMatrimonial);
router.route("/matrimonial/profiles").get(verifyJwt, searchMatrimonialProfile);
router.route("/matrimonial/:id").get(verifyJwt, getUserMatrimonial);

export default router;
