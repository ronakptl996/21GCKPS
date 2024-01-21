import mongoose, { Schema } from "mongoose";

const jobSchema = new Schema(
  {
    jobTitle: { type: String, required: true },
    jobLocation: { type: String, required: true },
    jobDescription: { type: String, required: true },
    minExperience: { type: String, required: true },
    maxExperience: { type: String, required: true },
    salary: { type: Number, required: true },
    opening: { type: Number, required: true },
    companyName: { type: String, required: true },
    companyContact: { type: Number, required: true },
    companyEmail: { type: String, required: true },
    companyIndustry: { type: String, required: true },
    companyAddress: { type: String, required: true },
    createdBy: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export const Job = mongoose.model("Job", jobSchema);
