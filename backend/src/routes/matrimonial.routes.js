import { Router } from "express";
import { verifyJwt } from "../middlewares/auth.middleware.js";
import {
  addMatrimonial,
  editMatrimonialProfile,
  editMatrimonialUserAvatar,
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
router.route("/matrimonial/edit").patch(verifyJwt, editMatrimonialProfile);
router
  .route("/matrimonial/edit-avatar")
  .post(verifyJwt, upload.single("avatar"), editMatrimonialUserAvatar);

export default router;
