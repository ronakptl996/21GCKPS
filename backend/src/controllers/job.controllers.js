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

export { addJob, getJob };
