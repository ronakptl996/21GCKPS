import { Family } from "../models/family.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { Help } from "../models/help.model.js";

const addHelpData = asyncHandler(async (req, res) => {
  console.log(req.body);
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

    console.log({ contactCreatedData });

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

export { addHelpData };
