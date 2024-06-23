import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

dotenv.config({
  path: "./.env",
});

app.use(express.static("temp"));
app.use(
  cors({
    origin: process.env.CORS_ORIGIN, // Replace with your frontend domain
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], // Ensure these methods are allowed
    credentials: true,
  })
);
console.log("ENV >>", process.env.CORS_ORIGIN);
// app.use(express.json({ limit: "16kb" }));
app.use(express.json());
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(cookieParser());

import familyRoute from "./routes/family.routes.js";
import adminRoute from "./routes/admin.routes.js";
import matrimonialRoute from "./routes/matrimonial.routes.js";
import donationPaymentRoute from "./routes/donationPayment.routes.js";
import donorRoute from "./routes/donor.routes.js";
import jobRoute from "./routes/job.routes.js";
import businessRoute from "./routes/business.routes.js";
import helpRoute from "./routes/help.routes.js";

// User Route
app.use("/api/users", familyRoute);

// Matrimonial Route
app.use("/api", matrimonialRoute);

// Admin Route
app.use("/api/admin", adminRoute);

// Payment Donation Route
app.use("/api/donation/payment", donationPaymentRoute);
app.use("/api/donor", donorRoute);

// Job Route
app.use("/api/job", jobRoute);

// Business Route
app.use("/api/business", businessRoute);

// Contact Us Route
app.use("/api/help", helpRoute);

export { app };
