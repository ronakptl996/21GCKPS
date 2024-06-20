import { Router } from "express";
import { verifyJwtAdmin } from "../middlewares/auth.middleware.js";
import {
  addHelpData,
  getHelpData,
  updateHelpStatus,
} from "../controllers/help.controllers.js";

const router = Router();

// User Route
router.route("/").post(addHelpData);

// Admin Route
router.route("/").get(verifyJwtAdmin, getHelpData);
router.route("/status").post(verifyJwtAdmin, updateHelpStatus);

export default router;
