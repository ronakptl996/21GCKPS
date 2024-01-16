import mongoose, { Schema } from "mongoose";

const donorSchema = new Schema(
  {
    orderId: { type: String },
    paymentId: { type: String },
    signatureId: { type: String },
    amount: { type: Number },
    donateQty: { type: Number },
    status: { type: String, default: "pending" },
    donorName: { type: String },
    donorEmail: { type: String },
    donorContact: { type: String },
    donateName: { type: String },
  },
  { timestamps: true }
);

export const Donor = mongoose.model("Donor", donorSchema);
