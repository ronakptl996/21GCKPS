import mongoose, { Schema } from "mongoose";

const committeeSchema = new Schema(
  {
    name: { type: String, required: true },
    address: { type: String, required: true },
    mobile: { type: Number, required: true },
    avatar: { type: String },
    committeeName: { type: String, required: true },
  },
  { timestamps: true }
);

export const Committee = mongoose.model("Committee", committeeSchema);
