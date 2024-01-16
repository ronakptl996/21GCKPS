import { Router } from "express";
import { verifyJwt } from "../middlewares/auth.middleware.js";
import {
  checkout,
  verifyPayment,
} from "../controllers/donationPayment.controller.js";

const router = Router();

router.route("/checkout").post(verifyJwt, checkout);
router.route("/verifyPayment/:id/:qty").post(verifyPayment);

export default router;
