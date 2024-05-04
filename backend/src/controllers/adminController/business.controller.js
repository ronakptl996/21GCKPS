import fs from "fs";
import { Business } from "../../models/business.model.js";
import { ApiError } from "../../utils/ApiError.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import { asyncHandler } from "../../utils/asyncHandler.js";

// *Fetch Business detail expiryDate greaterThan Date.now() and isApproved: true
const getAdminApprovedBusinessDetails = asyncHandler(async (req, res) => {
  try {
    const data = await Business.aggregate([
      {
        $match: {
          expiryDate: { $gt: new Date() },
          isApproved: true,
        },
      },
      {
        $lookup: {
          from: "families", // Assuming the Family collection is named "families"
          localField: "createdBy", // The field in Business that references Family
          foreignField: "_id", // The field in Family to match
          as: "creatorDetails", // Store results in this new field
        },
      },
      {
        $unwind: "$creatorDetails", // Ensures only one result from the lookup
      },
      {
        $addFields: {
          creatorFullName: {
            $concat: [
              "$creatorDetails.headOfFamily.surname",
              " ",
              "$creatorDetails.headOfFamily.firstname",
              " ",
              "$creatorDetails.headOfFamily.secondname",
            ],
          },
        },
      },
      {
        $project: {
          _id: 1,
          businessOwner: 1,
          businessName: 1,
          businessContact: 1,
          businessEmail: 1,
          businessLogo: 1,
          isApproved: 1,
          packageType: 1,
          expiryDate: 1,
          creatorFullName: 1, // Include the newly created field
        },
      },
    ]);

    if (!data) {
      throw new ApiError(500, "Data not found!");
    }

    return res.status(200).json(new ApiResponse(200, data, ""));
  } catch (error) {
    console.error("Error fetching businesses:", error);
    throw new ApiError(500, "Error fetching approved businesses", error);
  }
});

// *Fetch Business detail expiryDate lessThan Date.now() and isApproved: true
const getAdminExpiredBusinessDetails = asyncHandler(async (req, res) => {
  try {
    const data = await Business.aggregate([
      {
        $match: {
          expiryDate: { $lt: new Date() },
          isApproved: true,
        },
      },
      {
        $lookup: {
          from: "families", // Assuming the Family collection is named "families"
          localField: "createdBy", // The field in Business that references Family
          foreignField: "_id", // The field in Family to match
          as: "creatorDetails", // Store results in this new field
        },
      },
      {
        $unwind: "$creatorDetails", // Ensures only one result from the lookup
      },
      {
        $addFields: {
          creatorFullName: {
            $concat: [
              "$creatorDetails.headOfFamily.surname",
              " ",
              "$creatorDetails.headOfFamily.firstname",
              " ",
              "$creatorDetails.headOfFamily.secondname",
            ],
          },
        },
      },
      {
        $project: {
          _id: 1,
          businessOwner: 1,
          businessName: 1,
          businessContact: 1,
          businessEmail: 1,
          businessLogo: 1,
          isApproved: 1,
          packageType: 1,
          expiryDate: 1,
          creatorFullName: 1, // Include the newly created field
        },
      },
    ]);

    if (!data) {
      throw new ApiError(500, "Data not found!");
    }

    return res.status(200).json(new ApiResponse(200, data, ""));
  } catch (error) {
    console.error("Error fetching businesses:", error);
    throw new ApiError(
      500,
      "Error fetching expired approved businesses",
      error
    );
  }
});

// *Fetch Business detail isApproved: false
const getAdminUnapprovedBusinessDetails = asyncHandler(async (req, res) => {
  try {
    const data = await Business.aggregate([
      {
        $match: {
          isApproved: false,
        },
      },
      {
        $lookup: {
          from: "families", // Assuming the Family collection is named "families"
          localField: "createdBy", // The field in Business that references Family
          foreignField: "_id", // The field in Family to match
          as: "creatorDetails", // Store results in this new field
        },
      },
      {
        $unwind: "$creatorDetails", // Ensures only one result from the lookup
      },
      {
        $addFields: {
          creatorFullName: {
            $concat: [
              "$creatorDetails.headOfFamily.surname",
              " ",
              "$creatorDetails.headOfFamily.firstname",
              " ",
              "$creatorDetails.headOfFamily.secondname",
            ],
          },
        },
      },
      {
        $project: {
          _id: 1,
          businessOwner: 1,
          businessName: 1,
          businessContact: 1,
          businessEmail: 1,
          businessLogo: 1,
          isApproved: 1,
          packageType: 1,
          expiryDate: 1,
          creatorFullName: 1, // Include the newly created field
        },
      },
    ]);

    if (!data) {
      throw new ApiError(500, "Data not found!");
    }

    return res.status(200).json(new ApiResponse(200, data, ""));
  } catch (error) {
    console.error("Error fetching unapproved businesses:", error);
    throw new ApiError(500, "Error fetching unapproved businesses", error);
  }
});

// *Delete Business details
const deleteBusinessDetails = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      throw new ApiError(401, "Business Id is required!");
    }

    const data = await Business.findByIdAndDelete(id);

    if (!data) {
      throw new ApiError(500, "Business data not found!");
    }

    // Remove logo image from folder
    if (data.businessLogo) {
      const imagePath = `./temp/business/${data.businessLogo}`;
      // Remove File from folder
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
    }

    // Remove visiting card image from folder
    const imagePath = `./temp/business/${data.businessVisitingCard}`;
    // Remove File from folder
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
      .json(new ApiResponse(200, data, "Business details delete successfully"));
  } catch (error) {
    console.error("Error while delete business details:", error);
    throw new ApiError(500, "Error while delete business details", error);
  }
});

export {
  getAdminApprovedBusinessDetails,
  getAdminExpiredBusinessDetails,
  getAdminUnapprovedBusinessDetails,
  deleteBusinessDetails,
};
