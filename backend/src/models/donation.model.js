import mongoose, { Schema } from "mongoose";

const donationSchema = new Schema(
  {
    name: { type: String, required: true },
    totalQty: { type: Number, required: true },
    contact: { type: Number, required: true },
    image: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
  },
  { timestamps: true }
);

export const Donation = mongoose.model("Donation", donationSchema);
