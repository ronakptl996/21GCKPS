import mongoose, { Schema } from "mongoose";

const helpSchema = new Schema({
  name: { type: String, required: true },
  mobile: { type: Number, required: true },
  email: { type: String, required: true },
  message: { type: String, required: true },
  status: { type: String, default: "Pending" },
  resolvedBy: { type: Schema.Types.ObjectId, ref: "Family" },
});

export const Help = mongoose.model("help", helpSchema);
