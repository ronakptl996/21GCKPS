import { Router } from "express";
import { verifyJwt, verifyJwtAdmin } from "../middlewares/auth.middleware.js";
import {
  addCommittee,
  getCommittee,
  editCommitteeDetail,
  deleteCommitteeUser,
  editCommitteeUserAvatar,
  getSpecificCommittee,
} from "../controllers/adminController/committee.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
import {
  addFestival,
  deleteFestivalDetail,
  editFestivalDetail,
  getFestival,
  getFestivalDetails,
} from "../controllers/adminController/festival.controller.js";
import {
  addDonation,
  deleteDonationData,
  editDonationDetail,
  editDonationImage,
  getDonationDetails,
  getSpecificDonationDetail,
} from "../controllers/adminController/donation-controller.js";
import {
  adminStatictics,
  deleteUserProfile,
  getMatrimonialMenWomenCount,
  getVillageWiseMenWomenCount,
} from "../controllers/adminController/family.controllers.js";
import {
  deleteBusinessDetails,
  getAllBusinessDetails,
} from "../controllers/adminController/business.controller.js";

const router = Router();
// router.route("/").get(verifyJwtAdmin);

// Delete User Profile
router.route("/delete-user").delete(verifyJwtAdmin, deleteUserProfile);

// Committee Route
router
  .route("/add-committee")
  .post(verifyJwtAdmin, upload.single("avatar"), addCommittee);
router
  .route("/edit-committee-avatar")
  .post(verifyJwtAdmin, upload.single("avatar"), editCommitteeUserAvatar);
router.route("/committee").get(verifyJwt, getCommittee);
router.route("/committee/:committeeName").get(verifyJwt, getSpecificCommittee);
router.route("/edit-committee").patch(verifyJwtAdmin, editCommitteeDetail);
router.route("/delete-committee").delete(verifyJwtAdmin, deleteCommitteeUser);

// Festival Route
router.route("/add-festival").post(verifyJwtAdmin, addFestival);
router.route("/festival").get(verifyJwt, getFestival);
router.route("/festival/:id").get(verifyJwt, getFestivalDetails);
router.route("/edit-festival").patch(verifyJwtAdmin, editFestivalDetail);
router.route("/delete-festival").delete(verifyJwtAdmin, deleteFestivalDetail);

// Donation Route
router
  .route("/add-donation")
  .post(verifyJwtAdmin, upload.single("donationImage"), addDonation);
router.route("/donation").get(verifyJwt, getDonationDetails);
router.route("/donation/:id").get(verifyJwt, getSpecificDonationDetail);
router
  .route("/edit-donation-image")
  .patch(verifyJwtAdmin, upload.single("donationImage"), editDonationImage);
router.route("/edit-donation").patch(verifyJwtAdmin, editDonationDetail);
router.route("/delete-donation").delete(verifyJwtAdmin, deleteDonationData);

// ADMIN Home page village wise data
router
  .route("/village-wise-men-women/:villageName")
  .get(verifyJwtAdmin, getVillageWiseMenWomenCount);
router
  .route("/matrimonial-men-women-count/:villageName")
  .get(verifyJwtAdmin, getMatrimonialMenWomenCount);
router.route("/statictics").get(verifyJwtAdmin, adminStatictics);

// ^ ADMIN Business Route
router.route("/business").get(getAllBusinessDetails);
router.route("/business/delete/:id").delete(deleteBusinessDetails);

export default router;
