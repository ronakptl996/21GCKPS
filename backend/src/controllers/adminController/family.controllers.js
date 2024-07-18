import { Committee } from "../../models/committee.model.js";
import { Family } from "../../models/family.model.js";
import { Festival } from "../../models/festival.model.js";
import { Matrimonial } from "../../models/matrimonial.model.js";
import { Job } from "../../models/job.model.js";
import { ApiError } from "../../utils/ApiError.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import { asyncHandler } from "../../utils/asyncHandler.js";

// ^Village wise men/women count
const getVillageWiseMenWomenCount = asyncHandler(async (req, res) => {
  const { villageName } = req.params;

  try {
    // Ensure villageName is not empty or undefined
    if (!villageName) {
      throw new ApiError(400, "Village name is required!");
    }

    const data = await Family.aggregate([
      {
        $match: {
          "headOfFamily.address": villageName, // Filter by the village name from front-end
        },
      },
      {
        $group: {
          _id: "$headOfFamily.address", // Group by village name
          menCount: {
            $sum: {
              $add: [
                1, // Always count headOfFamily as a man
                {
                  $cond: [
                    { $isArray: "$sonDetails" },
                    { $size: "$sonDetails" },
                    0,
                  ],
                }, // Count sons
              ],
            },
          },
          womenCount: {
            $sum: {
              $add: [
                1, // Always count wifeDetails as a woman
                {
                  $cond: [
                    { $isArray: "$daughterDetails" },
                    { $size: "$daughterDetails" },
                    0,
                  ],
                }, // Count daughters
              ],
            },
          },
        },
      },
      {
        $project: {
          _id: 0,
          village: "$_id", // Include the village name
          menCount: 1,
          womenCount: 1,
        },
      },
    ]);

    if (!data) {
      throw new ApiError(404, "No data found for the specified village!");
    }

    return res.status(200).json(new ApiResponse(200, data, ""));
  } catch (error) {
    console.log("error >", error);
    throw new ApiError(500, "Something went wrong!");
  }
});

// ^Village wise Matrimonial men/women count
const getMatrimonialMenWomenCount = asyncHandler(async (req, res) => {
  const { villageName } = req.params;

  // Ensure villageName is not empty or undefined
  if (!villageName) {
    throw new ApiError(400, "Village name is required!");
  }

  try {
    const data = await Matrimonial.aggregate([
      {
        $match: {
          address: villageName, // Filter by village name
        },
      },
      {
        $group: {
          _id: "$address", // Group by village from the address
          menCount: {
            $sum: { $cond: [{ $eq: ["$gender", "male"] }, 1, 0] }, // Count men
          },
          womenCount: {
            $sum: { $cond: [{ $eq: ["$gender", "female"] }, 1, 0] }, // Count women
          },
        },
      },
      {
        $project: {
          _id: 0,
          village: "$_id", // Set village name
          menCount: 1,
          womenCount: 1,
        },
      },
    ]);

    if (!data) {
      throw new ApiError(404, "No data found!");
    }

    return res.status(200).json(new ApiResponse(200, data, ""));
  } catch (error) {
    console.log("error >", error);
    throw new ApiError(500, "Something went wrong!");
  }
});

// ^Get Family, Festival, Committee and Job document count
const adminStatictics = asyncHandler(async (req, res) => {
  try {
    const totalFamily = await Family.countDocuments(); // Get total count of Family documents
    const totalFestival = await Festival.countDocuments(); // Get total count of Festival documents
    const totalCommittee = await Committee.countDocuments(); // Get total count of Committee documents
    const totalJob = await Job.countDocuments(); // Get total count of Job documents

    const statistics = {
      totalFamily,
      totalFestival,
      totalCommittee,
      totalJob,
    };

    return res.status(200).json(new ApiResponse(200, statistics, ""));
  } catch (error) {
    console.error("Error fetching statistics:", error);
    throw new ApiError(500, "Error fetching statistics");
  }
});

const deleteUserProfile = asyncHandler(async (req, res) => {
  try {
    const { userId } = req.body;

    if (!userId) {
      throw new ApiError(400, "UserId is required!");
    }

    const userData = await Family.findByIdAndDelete(userId);

    if (!userData) {
      throw new ApiError(404, "User not found!");
    }

    return res
      .status(200)
      .json(new ApiResponse(200, userData, "User deleted successfully!"));
  } catch (error) {
    throw new ApiError(500, "Something went wrong!");
  }
});

export {
  getVillageWiseMenWomenCount,
  getMatrimonialMenWomenCount,
  adminStatictics,
  deleteUserProfile,
};
