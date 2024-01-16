import mongoose, { Schema } from "mongoose";

const festivalSchema = new Schema(
  {
    name: { type: String, required: true },
    address: { type: String, required: true },
    fromDate: { type: String, required: true },
    toDate: { type: String, required: true },
    description: { type: String, required: true },
  },
  { timestamps: true }
);

export const Festival = mongoose.model("Festival", festivalSchema);
