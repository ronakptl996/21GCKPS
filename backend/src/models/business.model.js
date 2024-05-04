import mongoose, { Schema } from "mongoose";

const businessSchema = Schema({
  businessOwner: { type: String, required: true },
  businessName: { type: String, required: true },
  businessContact: { type: Number, required: true },
  businessEmail: { type: String, required: true },
  businessAddress: { type: String, required: true },
  businessLogo: { type: String, default: null },
  businessVisitingCard: { type: String },
  provideServices: [String],
  openingHours: { type: String },
  businessWebsite: { type: String },
  businessInstagramUsername: { type: String },
  businessTwitterUsername: { type: String },
  businessFacebookUsername: { type: String },
  quickInfo: { type: String },
  detailedInfo: { type: String },
  yearOfEstablishment: { type: Number },
  businessCategory: { type: String },
  isApproved: { type: Boolean, default: false },
  packageType: { type: String, enum: ["FREE", "ELITE", "PREMIUM"] },
  createdBy: { type: Schema.Types.ObjectId, ref: "Family" },
  expiryDate: { type: Date, required: true },
});

export const Business = mongoose.model("Business", businessSchema);
