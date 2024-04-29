import { Family } from "../../models/family.model.js";
import { ApiError } from "../../utils/ApiError.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import { asyncHandler } from "../../utils/asyncHandler.js";

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

    if (!data || data.length === 0) {
      throw new ApiError(404, "No data found for the specified village!");
    }

    return res.status(200).json(new ApiResponse(200, data, ""));
  } catch (error) {
    console.log("error >", error);
    throw new ApiError(500, "Something went wrong!");
  }
});

export { getVillageWiseMenWomenCount };
