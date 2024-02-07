import mongoose, { Schema } from "mongoose";

const forgotSchema = new Schema(
  {
    phone: { type: String, required: true },
    requestId: { type: String, required: true },
    otp: { type: String, required: true },
  },
  { timestamps: true }
);

export const Forgot = mongoose.model("Forgot", forgotSchema);
