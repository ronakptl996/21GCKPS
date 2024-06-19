import { Router } from "express";
import { addHelpData } from "../controllers/help.controllers.js";

const router = Router();

router.route("/").post(addHelpData);
export default router;
