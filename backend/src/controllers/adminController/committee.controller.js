import { ApiError } from "../../utils/ApiError.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { Committee } from "../../models/committee.model.js";
import { uploadOnCloudinary } from "../../utils/cloudinary.js";

const addCommittee = asyncHandler(async (req, res) => {
  const { name, address, mobile, committeeName } = req.body;
  const avatarLocalPath = req.file?.path;

  if (!avatarLocalPath) {
    throw new ApiError(400, "Avatar file is required");
  }

  const avatar = await uploadOnCloudinary(avatarLocalPath);

  if (!avatar) {
    throw new ApiError(400, "Avatar file is required");
  }

  const committeeDetails = await Committee.create({
    name,
    address,
    mobile,
    committeeName,
    avatar: avatar.url,
  });

  const createdData = await Committee.findById(committeeDetails._id);

  if (!createdData) {
    throw new ApiError(500, "Something went wrong while add committee details");
  }

  return res
    .status(201)
    .json(
      new ApiResponse(201, createdData, "Committee Details add successfully")
    );
});

const editCommitteeUserAvatar = asyncHandler(async (req, res) => {
  const { userId } = req.body;
  const avatarLocalPath = req.file?.path;

  console.log("avatarLocalPath ::", avatarLocalPath);
  if (!avatarLocalPath) {
    throw new ApiError(400, "Avatar file is required");
  }

  const committeeUserData = await Committee.findById(userId);

  if (!committeeUserData) {
    throw new ApiError(400, "User not found");
  }

  const avatar = await uploadOnCloudinary(avatarLocalPath);

  if (!avatar) {
    throw new ApiError(400, "Avatar file is required");
  }

  const updatedData = await Committee.findByIdAndUpdate(
    userId,
    {
      $set: {
        avatar: avatar.url,
      },
    },
    { new: true }
  );

  if (!updatedData) {
    throw new ApiError(500, "Error while edit committee user avatar");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, updatedData, "Committee User Image Updated"));
});

const getCommittee = asyncHandler(async (req, res) => {
  const committeeDetails = await Committee.find();

  if (!committeeDetails) {
    throw new ApiError(500, "Error while fetching committee details");
  }

  return res.status(200).json(new ApiResponse(200, committeeDetails, ""));
});

const editCommitteeDetail = asyncHandler(async (req, res) => {
  const { userId, name, address, mobile, committeeName } = req.body;

  const committeeUser = await Committee.findById(userId);
  if (!committeeUser) {
    throw new ApiError(404, "User not found!");
  }

  try {
    let updatedData = await Committee.findByIdAndUpdate(
      userId,
      {
        $set: {
          name,
          address,
          mobile,
          committeeName,
        },
      },
      { new: true }
    );

    if (!updatedData) {
      throw new ApiError(501, "Error while updating user detail!");
    }

    return res
      .status(200)
      .json(
        new ApiResponse(200, updatedData, "User details updated successfully!")
      );
  } catch (error) {
    throw new ApiError(
      501,
      error || "Something went wrong while updating user detail!"
    );
  }
});

const deleteCommitteeUser = asyncHandler(async (req, res) => {
  console.log(req.body);
  const { userId } = req.body;

  try {
    let updatedData = await Committee.findByIdAndDelete(userId);

    if (!updatedData) {
      throw new ApiError(404, "User not found!");
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

const getSpecificCommittee = asyncHandler(async (req, res) => {
  const { committeeName } = req.params;

  if (!committeeName) {
    throw new ApiError(401, "committeeName is required!");
  }

  const data = await Committee.find({ committeeName });

  if (!data) {
    throw new ApiError(500, "Data not found!");
  }

  return res.status(200).json(new ApiResponse(200, data, ""));
});

export {
  addCommittee,
  getCommittee,
  editCommitteeDetail,
  deleteCommitteeUser,
  editCommitteeUserAvatar,
  getSpecificCommittee,
};
