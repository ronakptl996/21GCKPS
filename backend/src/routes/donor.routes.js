import { Router } from "express";
import { verifyJwt } from "../middlewares/auth.middleware.js";
import { getDonor, getDonorByPaymentId } from "../controllers/donor.controllers.js";

const router = Router();

router.route("/").get(verifyJwt, getDonor);
router.route("/:paymentId").get(verifyJwt, getDonorByPaymentId);

export default router;
