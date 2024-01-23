import { Router } from "express";
import { verifyJwt, verifyJwtAdmin } from "../middlewares/auth.middleware.js";
import {
  addJob,
  deleteJob,
  getJob,
  updateJob,
} from "../controllers/job.controllers.js";

const router = Router();

router.route("/").get(verifyJwt, getJob);
router.route("/add-job").post(verifyJwt, addJob);
router.route("/update-job").patch(verifyJwtAdmin, updateJob);
router.route("/delete-job").delete(verifyJwtAdmin, deleteJob);

export default router;
