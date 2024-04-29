import { Router } from "express";
import { verifyJwt } from "../middlewares/auth.middleware.js";
import {
  addBusiness,
  getBusinessData,
  getBusinessDataByID,
} from "../controllers/business.controllers.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = Router();

router.route("/add").post(
  verifyJwt,
  upload.fields([
    { name: "businessVisitingCard", maxCount: 1 },
    { name: "businessLogo", maxCount: 1 },
  ]),
  addBusiness
);

router.route("/valid").get(verifyJwt, getBusinessData); // ^ route for only expiryDate is greater than the current date and isApproved: true
router.route("/:id").get(verifyJwt, getBusinessDataByID); // ^ route for get Business data using ID

export default router;
