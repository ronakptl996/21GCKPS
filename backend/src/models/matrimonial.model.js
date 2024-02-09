import mongoose, { Schema } from "mongoose";

const matrimonialSchema = new Schema({
  fullName: { type: String, required: true },
  fatherName: { type: String, required: true },
  motherName: { type: String, required: true },
  education: { type: String, required: true },
  profession: { type: String, required: true },
  gender: { type: String, required: true },
  achievement: { type: String },
  facebookUserName: { type: String },
  instagramUserName: { type: String },
  photo: { type: String, required: true },
  contact: { type: String, required: true },
  bloodGroup: { type: String },
  maternalUncle: { type: String },
  mamaVillageName: { type: String },
  address: { type: String },
  dob: { type: String },
  interest: [String],
  hobby: [String],
  yourSelf: { type: String, required: true },
  brotherSisterDetails: [
    {
      surname: { type: String },
      firstname: { type: String },
      secondname: { type: String },
      profession: { type: String },
      education: { type: String },
    },
  ],
});

export const Matrimonial = mongoose.model("Matrimonial", matrimonialSchema);
