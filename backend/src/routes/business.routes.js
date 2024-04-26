import { Router } from "express";
import { verifyJwt } from "../middlewares/auth.middleware.js";
import { addBusiness } from "../controllers/business.controllers.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = Router();

router.route("/add").post(
  upload.fields([
    { name: "businessVisitingCard", maxCount: 1 },
    { name: "businessLogo", maxCount: 1 },
  ]),
  addBusiness
);

export default router;
