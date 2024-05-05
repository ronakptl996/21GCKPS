import { Router } from "express";
import { verifyJwt } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";
import {
  addBusiness,
  editMyBusinessData,
  getBusinessData,
  getBusinessDataByID,
  myBusinessData,
  updateBusinessImage,
} from "../controllers/business.controllers.js";

const router = Router();

// ^User BUSINESS Route
router.route("/my-business").get(verifyJwt, myBusinessData);
router.route("/my-business/edit").patch(verifyJwt, editMyBusinessData);
router
  .route("/my-business/update-image")
  .patch(verifyJwt, upload.single("avatar"), updateBusinessImage);
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
