import { Business } from "../models/business.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const addBusiness = asyncHandler(async (req, res) => {
  console.log(req.body);
  console.log("FILE >>>", req.files);
  try {
  } catch (error) {}
});

export { addBusiness };
