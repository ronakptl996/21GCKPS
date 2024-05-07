import fs from "fs";
import { Business } from "../../models/business.model.js";
import { ApiError } from "../../utils/ApiError.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import { asyncHandler } from "../../utils/asyncHandler.js";

// *Get all business data in one API call categorized into approved, unapproved, and expired
const getAllBusinessDetails = asyncHandler(async (req, res) => {
  try {
    const data = await Business.aggregate([
      {
        $facet: {
          // *Fetch Business detail expiryDate greaterThan Date.now() and isApproved: true
          approved: [
            {
              $match: {
                expiryDate: { $gt: new Date() },
                isApproved: true,
              },
            },
            {
              $lookup: {
                from: "families", // Assuming Family collection
                localField: "createdBy",
                foreignField: "_id",
                as: "creatorDetails",
              },
            },
            {
              $unwind: "$creatorDetails",
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
                packageType: 1,
                expiryDate: 1,
                creatorFullName: 1,
              },
            },
          ],

          // *Fetch Business detail expiryDate lessThan Date.now() and isApproved: true
          expired: [
            {
              $match: {
                expiryDate: { $lt: new Date() },
                isApproved: true,
              },
            },
            {
              $lookup: {
                from: "families",
                localField: "createdBy",
                foreignField: "_id",
                as: "creatorDetails",
              },
            },
            {
              $unwind: "$creatorDetails",
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
                packageType: 1,
                expiryDate: 1,
                creatorFullName: 1,
              },
            },
          ],

          // *Fetch Business detail isApproved: false
          unapproved: [
            {
              $match: {
                isApproved: false,
              },
            },
            {
              $lookup: {
                from: "families",
                localField: "createdBy",
                foreignField: "_id",
                as: "creatorDetails",
              },
            },
            {
              $unwind: "$creatorDetails",
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
                packageType: 1,
                expiryDate: 1,
                creatorFullName: 1,
              },
            },
          ],
        },
      },
    ]);

    if (!data) {
      throw new ApiError(404, "No data found");
    }

    res.status(200).json(new ApiResponse(200, data, ""));
  } catch (error) {
    console.error("Error fetching business details:", error);
    throw new ApiError(500, "Error fetching business details", error);
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

export { deleteBusinessDetails, getAllBusinessDetails };
