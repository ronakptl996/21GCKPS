import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

// app.use(express.json({ limit: "16kb" }));
app.use(express.json());
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());

import familyRoute from "./routes/family.routes.js";
import adminRoute from "./routes/admin.routes.js";
import matrimonialRoute from "./routes/matrimonial.routes.js";
import donationPaymentRoute from "./routes/donationPayment.routes.js";
import donorRoute from "./routes/donor.routes.js";
import jobRoute from "./routes/job.routes.js";
import multer from "multer";
import { ApiError } from "./utils/ApiError.js";

app.use("/api/users", familyRoute);
app.use("/api", matrimonialRoute);
// Admin Route
app.use("/api/admin", adminRoute);
// Payment Donation Route
app.use("/api/donation/payment", donationPaymentRoute);
app.use("/api/donor", donorRoute);
// Job Route
app.use("/api/job", jobRoute);

// // Handle Multer Error
// app.use((error, req, res, next) => {
//   if (error instanceof multer.MulterError) {
//     if (error.code === "LIMIT_UNEXPECTED_FILE") {
//       throw new ApiError(400, "File must be an image");
//     }
//   }
// });

export { app };
