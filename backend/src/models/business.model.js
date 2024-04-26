import mongoose, { Schema } from "mongoose";

const businessSchema = Schema({
  businessOwner: { type: String, required: true },
  businessName: { type: String, required: true },
  businessContact: { type: Number, required: true },
  businessEmail: { type: String, required: true },
  businessAddress: { type: String, required: true },
  businessLogo: { type: String },
  businessVisitingCard: { type: String },
  provideServices: [String],
  openingHours: { type: String },
  businessWebsite: { type: String },
  businessInstagramUsername: { type: String },
  businessTwitterUsername: { type: String },
  businessFacebookUsername: { type: String },
  quickInfo: { type: String },
  detailedInfo: { type: String },
  yearOfEstablishment: { type: String },
  businessCategory: { type: String },
  isApproved: { type: Boolean, default: false },
  packageType: { type: string, enum: ["FREE", "ELITE", "PREMIER"] },
  createdBy: { type: string, required: true },
  expiryDate: { type: Date, required: true },
});

export const Business = mongoose.model("Business", businessSchema);
