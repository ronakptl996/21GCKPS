import { ApiError } from "../../utils/ApiError.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { Festival } from "../../models/festival.model.js";

const addFestival = asyncHandler(async (req, res) => {
  const festivalDetail = await Festival.create(req.body);

  console.log("festivalDetail ::", festivalDetail);

  const createdData = await Festival.findById(festivalDetail._id);

  if (!createdData) {
    throw new ApiError(500, "Something went wrong while add festival details");
  }

  return res
    .status(201)
    .json(
      new ApiResponse(201, createdData, "Festival details add successfully")
    );
});

const getFestival = asyncHandler(async (req, res) => {
  const festivalDetails = await Festival.find();

  if (!festivalDetails) {
    throw new ApiError(500, "Error while fetching festival details");
  }

  return res.status(200).json(new ApiResponse(200, festivalDetails, ""));
});

const getFestivalDetails = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!id) {
    throw new ApiError(401, "Festival id is required!");
  }

  const data = await Festival.findById(id);
  if (!data) {
    throw new ApiError(500, "Data not found!");
  }
  return res.status(200).json(new ApiResponse(200, data, ""));
});

const editFestivalDetail = asyncHandler(async (req, res) => {
  const { name, address, fromDate, toDate, description, festivalId } = req.body;

  const editFestivalData = await Festival.findById(festivalId);

  console.log("editFestivalData ::", editFestivalData);
  if (!editFestivalData) {
    throw new ApiError(404, "Festival details not found!");
  }

  let updatedData = await Festival.findByIdAndUpdate(
    festivalId,
    {
      $set: {
        name,
        address,
        fromDate,
        toDate,
        description,
      },
    },
    { new: true }
  );

  console.log("updatedData ::>", updatedData);

  if (!updatedData) {
    throw new ApiError(501, "Error while updating user detail!");
  }

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        updatedData,
        "Festival details updated successfully!"
      )
    );
});

const deleteFestivalDetail = asyncHandler(async (req, res) => {
  console.log(req.body);
  const { festivalId } = req.body;

  try {
    let updatedData = await Festival.findByIdAndDelete(festivalId);

    if (!updatedData) {
      throw new ApiError(404, "Festival details not found!");
    }

    return res
      .status(200)
      .json(new ApiResponse(200, updatedData, "User deleted successfully!"));
  } catch (error) {
    throw new ApiError(
      501,
      error || "Something went wrong while deleting user detail!"
    );
  }
});

export {
  addFestival,
  getFestival,
  editFestivalDetail,
  deleteFestivalDetail,
  getFestivalDetails,
};
