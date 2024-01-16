import { Donor } from "../models/donor.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const getDonor = asyncHandler(async (req, res) => {
  try {
    const donorDetails = await Donor.find().sort({ _id: -1 });
    if (!donorDetails) {
      throw new ApiError(500, "Error while fetching Donor details");
    }
    return res.status(200).json(new ApiResponse(200, donorDetails, ""));
  } catch (error) {
    throw new ApiError(500, "Error while fetching Donor details");
  }
});

const getDonorByPaymentId = asyncHandler(async (req, res) => {
  try {
    const donorDetails = await Donor.findOne({
      paymentId: req.params.paymentId,
    });
    if (!donorDetails) {
      throw new ApiError(200, "Details not found!");
    }
    return res.status(200).json(new ApiResponse(200, donorDetails, ""));
  } catch (error) {
    console.log(error);
    throw new ApiError(500, error || "Error while fetching Donor detail");
  }
});

export { getDonor, getDonorByPaymentId };
