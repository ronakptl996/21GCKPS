import { Family } from "../models/family.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { Help } from "../models/help.model.js";

const addHelpData = asyncHandler(async (req, res) => {
  const { name, mobile, email, message } = req.body;

  if (!name || !mobile || !email || !message) {
    throw new ApiError(400, "Contact details is required");
  }

  const user = await Family.findOne({
    "headOfFamily.email": email,
    "headOfFamily.contact": mobile,
  });

  if (!user) {
    return res.status(404).json(new ApiResponse(404, {}, "User not found"));
  }

  try {
    const contactCreatedData = await Help.create({
      email,
      message,
      mobile,
      name,
      resolvedBy: null,
    });

    if (!contactCreatedData) {
      throw new ApiError(500, "Error while submitting contact");
    }

    return res
      .status(201)
      .json(
        new ApiResponse(201, contactCreatedData, "Admin will contact you soon")
      );
  } catch (error) {
    throw new ApiError(500, error.message || "Error while submitting contact");
  }
});

const getHelpData = asyncHandler(async (req, res) => {
  try {
    const response = await Help.aggregate([
      {
        $facet: {
          pendingHelps: [{ $match: { status: "Pending" } }],
          approvedHelps: [{ $match: { status: "Approved" } }],
          rejectedHelps: [{ $match: { status: "Rejected" } }],
        },
      },
    ]);

    if (!response && !response.length) {
      throw new ApiError(500, "Error while get help data");
    }

    return res.status(200).json(new ApiResponse(200, response[0], ""));
  } catch (error) {
    throw new ApiError(500, "Error while get help data");
  }
});

const updateHelpStatus = asyncHandler(async (req, res) => {
  const { id, status } = req.body;

  if (!id || !status) {
    throw new ApiError(400, "Id or status is required");
  }

  try {
    const data = await Help.findById(id);

    if (!data) {
      return res.status(404).json(new ApiResponse(404, {}, "Data not found!"));
    }

    const updatedData = await Help.findByIdAndUpdate(
      id,
      { status, resolvedBy: req.user._id, reason: req.body.reason || "" },
      { new: true }
    );

    if (!updatedData) {
      throw new ApiError(400, "Error while updating status");
    }

    return res
      .status(200)
      .json(new ApiResponse(200, updatedData, "Status updated successfully"));
  } catch (error) {
    throw new ApiError(500, error.message || "Error while updating status");
  }
});

export { addHelpData, getHelpData, updateHelpStatus };
