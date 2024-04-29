import { Business } from "../models/business.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { v4 as uuidv4 } from "uuid";
import { convertToWebP } from "../utils/optimizeImage.js";

const addBusiness = asyncHandler(async (req, res) => {
  const { businessData } = req.body;

  const parsedBusinessData = JSON.parse(businessData);

  const requiredFields = ["businessVisitingCard", "businessLogo"];

  const missingFields = requiredFields.filter((field) => !req.files[field]);

  if (missingFields.length > 0) {
    throw new ApiError(400, `${missingFields.join(", ")} files is missing`);
  }

  const businessVisitingCard = req.files["businessVisitingCard"][0];
  const businessLogo = req.files["businessLogo"][0];

  const filesToUpload = [
    {
      file: businessVisitingCard,
      fieldName: "businessVisitingCard",
      fileName: `${uuidv4()}-${
        businessVisitingCard.originalname.split(".")[0]
      }.webp`,
    },
    {
      file: businessLogo,
      fieldName: "businessLogo",
      fileName: `${uuidv4()}-${businessLogo.originalname.split(".")[0]}.webp`,
    },
  ];

  // ^Optimze and Upload Image
  await Promise.all(
    filesToUpload.map(async (file) => {
      const optimzedImage = await convertToWebP(
        file.file.buffer,
        `business/${file.fileName}`
      );
      if (!optimzedImage) {
        throw new ApiError(500, `Error while optimze ${file.fileName} image`);
      } else {
        if (file.fieldName.includes("businessVisitingCard")) {
          parsedBusinessData.businessVisitingCard = file.fileName;
        } else if (file.fieldName.includes("businessLogo")) {
          parsedBusinessData.businessLogo = file.fileName;
        }
      }
    })
  );

  try {
    parsedBusinessData.expiryDate = new Date(
      new Date().getTime() + 30 * 24 * 60 * 60 * 1000
    );
    parsedBusinessData.createdBy = req.user._id;

    const createdData = await Business.create(parsedBusinessData);

    if (!createdData) {
      throw new ApiError(500, "Error while add business details");
    }

    return res
      .status(201)
      .json(
        new ApiResponse(201, createdData, "Business data add successfully!")
      );
  } catch (error) {
    throw new ApiError(500, "Error while add business package", error);
  }
});

// ^Get Only expiryDate is greater than the current date and isApproved: true
const getBusinessData = asyncHandler(async (req, res) => {
  try {
    const now = new Date();

    console.log(now);

    // Query businesses where expiryDate is greater than the current date
    const validBusinesses = await Business.find({
      expiryDate: { $gte: now },
      isApproved: true,
    }).select("_id businessOwner businessName businessLogo packageType");

    return res.status(200).json(new ApiResponse(200, validBusinesses, "")); // Return the filtered business data
  } catch (error) {
    console.error("Error fetching valid businesses:", error);
    throw new ApiError(500, "Error fetching valid businesses", error); // Handle errors appropriately
  }
});

export { addBusiness, getBusinessData };