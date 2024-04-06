import fs from "fs";
import { v4 as uuidv4 } from "uuid";
import { ApiError } from "../../utils/ApiError.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { Committee } from "../../models/committee.model.js";
import { optimzeImage } from "../../utils/optimizeImage.js";

const addCommittee = asyncHandler(async (req, res) => {
  const { name, address, mobile, committeeName } = req.body;
  const avatarLocalImage = req.file;

  if (!avatarLocalImage) {
    throw new ApiError(400, "Avatar file is required");
  }

  // Save the optimized image to disk
  const imagePath = `${uuidv4()}-${req.file.originalname}`; // Adjust the path as needed

  const isOptimzeImage = await optimzeImage(req.file.buffer, imagePath);
  console.log("isOptimzeImage >", isOptimzeImage);

  if (!isOptimzeImage) {
    throw new ApiError(
      500,
      "Error while OptimzeImage edit committee user avatar"
    );
  }

  const committeeDetails = await Committee.create({
    name,
    address,
    mobile,
    committeeName,
    avatar: imagePath,
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
  const avatarLocalImage = req.file;

  console.log(userId);

  if (!avatarLocalImage) {
    throw new ApiError(400, "Avatar file is required");
  }

  const committeeUserData = await Committee.findById(userId);

  if (!committeeUserData) {
    throw new ApiError(400, "User not found");
  }

  console.log("AVATAR >", committeeUserData.avatar);
  const imagePath = `./temp/${committeeUserData.avatar}`;

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

  const newImagePath = `${uuidv4()}-${req.file.originalname}`;

  const isOptimzeImage = await optimzeImage(req.file.buffer, newImagePath);
  console.log("isOptimzeImage >", isOptimzeImage);

  if (!isOptimzeImage) {
    throw new ApiError(
      500,
      "Error while OptimzeImage edit committee user avatar"
    );
  }

  const updatedData = await Committee.findByIdAndUpdate(
    userId,
    {
      $set: {
        avatar: newImagePath,
      },
    },
    { new: true }
  );

  if (!updatedData) {
    throw new ApiError(500, "Error while edit committee user avatar");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, updatedData, "Committee member Image Updated"));
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
        new ApiResponse(
          200,
          updatedData,
          "Committee member details updated successfully!"
        )
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
