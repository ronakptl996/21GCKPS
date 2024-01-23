import { Job } from "../models/job.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const addJob = asyncHandler(async (req, res) => {
  const jobDetails = await Job.create(req.body);
  if (!jobDetails) {
    throw new ApiError(500, "Something went wrong while add Job details");
  }
  return res
    .status(201)
    .json(new ApiResponse(201, jobDetails, "Job Details added successfully"));
});

const getJob = asyncHandler(async (req, res) => {
  try {
    const jobDetails = await Job.find().sort({ _id: -1 });
    return res.status(201).json(new ApiResponse(201, jobDetails, ""));
  } catch (error) {
    throw new ApiError(500, "Something went wrong while fetch Job details");
  }
});

const updateJob = asyncHandler(async (req, res) => {
  const {
    jobId,
    jobTitle,
    jobLocation,
    jobDescription,
    minExperience,
    maxExperience,
    salary,
    opening,
    companyName,
    companyContact,
    companyEmail,
    companyIndustry,
    companyAddress,
  } = req.body;

  const jobData = await Job.findById(jobId);

  if (!jobData) {
    throw new ApiError(404, "Job Data not found!");
  }

  let updatedData = await Job.findByIdAndUpdate(
    jobId,
    {
      $set: {
        jobTitle,
        jobLocation,
        jobDescription,
        minExperience,
        maxExperience,
        salary,
        opening,
        companyName,
        companyContact,
        companyEmail,
        companyIndustry,
        companyAddress,
      },
    },
    { new: true }
  );

  if (!updatedData) {
    throw new ApiError(501, "Error while updating Job detail!");
  }

  return res
    .status(200)
    .json(
      new ApiResponse(200, updatedData, "Job details updated successfully!")
    );
});

const deleteJob = asyncHandler(async (req, res) => {
  const { jobId } = req.body;
  try {
    let updatedData = await Job.findByIdAndDelete(jobId);

    if (!updatedData) {
      throw new ApiError(404, "Job details not found!");
    }

    return res
      .status(200)
      .json(new ApiResponse(200, updatedData, "Job deleted successfully!"));
  } catch (error) {
    throw new ApiError(
      501,
      error || "Something went wrong while deleting job detail!"
    );
  }
});

export { addJob, getJob, updateJob, deleteJob };
