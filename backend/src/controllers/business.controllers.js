import fs from "fs";
import { Business } from "../models/business.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { v4 as uuidv4 } from "uuid";
import { convertToWebP } from "../utils/optimizeImage.js";

const addBusiness = asyncHandler(async (req, res) => {
  const { businessData } = req.body;

  const parsedBusinessData = JSON.parse(businessData);

  // package type ELITE or PREMIUM then upload multiple image
  if (parsedBusinessData.packageType !== "FREE") {
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
  } else {
    // For Package Type is FREE
    if (!req.files["businessVisitingCard"]) {
      throw new ApiError(400, "Please upload business visiting card");
    }

    const businessVisitingCard = req.files["businessVisitingCard"][0];

    const fileName = `${uuidv4()}-${
      businessVisitingCard.originalname.split(".")[0]
    }.webp`;

    const optimzedImage = await convertToWebP(
      businessVisitingCard.buffer,
      `business/${fileName}`
    );

    if (!optimzedImage) {
      throw new ApiError(500, `Error while optimze businessVisitingCard image`);
    }

    parsedBusinessData.businessVisitingCard = fileName;
    parsedBusinessData.businessLogo = null;
  }

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

    // Query businesses where expiryDate is greater than the current date
    const validBusinesses = await Business.aggregate([
      // Match businesses where expiryDate is greater than the current date
      { $match: { expiryDate: { $gt: now }, isApproved: true } },

      // Add a field for custom sorting based on packageType
      {
        $addFields: {
          packagePriority: {
            $switch: {
              branches: [
                { case: { $eq: ["$packageType", "PREMIUM"] }, then: 1 },
                { case: { $eq: ["$packageType", "ELITE"] }, then: 2 },
                { case: { $eq: ["$packageType", "FREE"] }, then: 3 },
              ],
              default: 4, // In case no packageType matches
            },
          },
        },
      },

      // Sort by the custom field in ascending order
      { $sort: { packagePriority: 1 } },

      // Project only the desired fields
      {
        $project: {
          _id: 1,
          businessOwner: 1,
          businessName: 1,
          businessLogo: {
            $ifNull: ["$businessLogo", "$businessVisitingCard"], // Use visiting card if logo is null or empty
          },
          packageType: 1,
        },
      },
    ]);

    return res.status(200).json(new ApiResponse(200, validBusinesses, "")); // Return the filtered business data
  } catch (error) {
    console.error("Error fetching valid businesses:", error);
    throw new ApiError(500, "Error fetching valid businesses", error); // Handle errors appropriately
  }
});

// ^Get Data for business using ID
const getBusinessDataByID = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!id) {
    throw new ApiError(401, "Business ID is required!");
  }

  try {
    const data = await Business.findById(id).select("-createdBy");

    if (!data) throw new ApiError(500, "Data not found!");

    return res.status(200).json(new ApiResponse(200, data, ""));
  } catch (error) {
    console.log(error);
    throw new ApiError(500, "Something went wrong!", error);
  }
});

// ^GET User Businesses data
const myBusinessData = asyncHandler(async (req, res) => {
  const userId = req?.user._id;

  if (!userId) {
    throw new ApiError(401, "Unable to get business data!");
  }

  try {
    const now = new Date();
    const data = await Business.aggregate([
      {
        $match: {
          createdBy: req.user._id, // Match businesses created by the given user ID
        },
      },
      {
        $addFields: {
          isExpired: { $lte: ["$expiryDate", now] }, // Determine if a business is expired
        },
      },
      {
        $group: {
          _id: null, // We don't want to group by any specific field, so use null
          approved: {
            $push: {
              $cond: [
                {
                  $and: [
                    { $eq: ["$isApproved", true] },
                    { $gt: ["$expiryDate", now] },
                  ],
                },
                "$$ROOT",
                null,
              ],
            },
          },
          expired: {
            $push: {
              $cond: [{ $lte: ["$expiryDate", now] }, "$$ROOT", null],
            },
          },
          notApproved: {
            $push: {
              $cond: [{ $eq: ["$isApproved", false] }, "$$ROOT", null],
            },
          },
        },
      },
      {
        $project: {
          approved: {
            $filter: {
              input: "$approved",
              as: "item",
              cond: { $ne: ["$$item", null] },
            },
          },
          expired: {
            $filter: {
              input: "$expired",
              as: "item",
              cond: { $ne: ["$$item", null] },
            },
          },
          notApproved: {
            $filter: {
              input: "$notApproved",
              as: "item",
              cond: { $ne: ["$$item", null] },
            },
          },
        },
      },
    ]);

    return res.status(200).json(new ApiResponse(200, data[0], ""));
  } catch (error) {
    console.log(error);
    throw new ApiError(500, "Something went wrong!", error);
  }
});

// Update Business data
const editMyBusinessData = asyncHandler(async (req, res) => {
  const { businessId } = req.body;

  if (!businessId) {
    throw new ApiError(401, "Unable to update data");
  }

  try {
    const updatedData = await Business.findByIdAndUpdate(businessId, req.body, {
      new: true,
    });

    if (!updatedData) {
      throw new ApiError(501, "Error while updating business detail!");
    }

    return res
      .status(200)
      .json(
        new ApiResponse(
          200,
          updatedData,
          "Business details updated successfully!"
        )
      );
  } catch (error) {
    throw new ApiError(501, error || "Something went wrong!");
  }
});

// Update Business Image
const updateBusinessImage = asyncHandler(async (req, res) => {
  const { changedImageFor, businessId } = req.body;
  const newImage = req.file;

  if (!businessId) {
    throw new ApiError(401, "Business Id is required!");
  }

  if (!changedImageFor) {
    throw new ApiError(401, "changedImageFor is required!");
  }

  try {
    const data = await Business.findById(businessId);

    if (!data) {
      throw new ApiError(501, "Business data not found!");
    }

    const newImagePath = `${uuidv4()}-${
      newImage.originalname.split(".")[0]
    }.webp`;

    const isOptimzeImage = await convertToWebP(
      req.file.buffer,
      `business/${newImagePath}`
    );
    console.log("isOptimzeImage >", isOptimzeImage);

    if (!isOptimzeImage) {
      throw new ApiError(500, "Error while Optimze Image business");
    }

    // Update the business with the new image path
    const updatedData = await Business.findByIdAndUpdate(
      businessId,
      { $set: { [changedImageFor]: newImagePath } },
      { new: true }
    );

    if (!updatedData) {
      throw new ApiError(501, "Business data not found!");
    }

    // Delete old image
    // Remove File from folder
    const imagePath = `./temp/business/${data[changedImageFor]}`;
    fs.access(imagePath, fs.constants.F_OK, (err) => {
      if (err) {
        console.error(`${imagePath} does not exist`);
        return;
      }

      // File exists, so proceed with deletion
      fs.unlink(imagePath, (err) => {
        if (err) {
          console.error(`Error deleting ${imagePath}: ${err}`);
          return;
        }
        console.log(`${imagePath} has been deleted successfully`);
      });
    });

    return res
      .status(200)
      .json(new ApiResponse(200, updatedData, "Image updated successfully"));
  } catch (error) {
    console.log("Erorr in updating business image >>", error);
    throw new ApiError(501, "Something went wrong!");
  }
});

export {
  addBusiness,
  getBusinessData,
  getBusinessDataByID,
  myBusinessData,
  editMyBusinessData,
  updateBusinessImage,
};
