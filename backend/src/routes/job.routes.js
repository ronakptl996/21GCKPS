import { Router } from "express";
import { verifyJwt } from "../middlewares/auth.middleware.js";
import { addJob, getJob } from "../controllers/job.controllers.js";

const router = Router();

router.route("/").get(verifyJwt, getJob);
router.route("/add-job").post(verifyJwt, addJob);

export default router;
