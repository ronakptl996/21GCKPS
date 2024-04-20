import fs from "fs";
import jwt from "jsonwebtoken";
import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcrypt";
import fast2sms from "fast-two-sms";
import { Family } from "../models/family.model.js";
import { Committee } from "../models/committee.model.js";
import { Forgot } from "../models/forgot.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { optimzeImage } from "../utils/optimizeImage.js";

const generateAccessAndRefereshTokens = async (userId) => {
  try {
    const user = await Family.findById(userId);
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    return { accessToken, refreshToken };
  } catch (error) {
    throw new ApiError(
      500,
      "Something went wrong while generating referesh and access token"
    );
  }
};

const registerFamily = asyncHandler(async (req, res) => {
  const { password, headOfFamily, wifeDetails, sonDetails, daughterDetails } =
    req.body;

  const existedUser = await Family.findOne({
    "headOfFamily.email": headOfFamily.email,
  });

  if (existedUser) {
    return res
      .status(401)
      .json(new ApiResponse(401, [], "User with email already exists"));
  }

  let headOfFamilyAvatar;
  let wifeAvatar;
  let sonAvatars = [];
  let daughterAvatars = [];

  req.files.map((file) => {
    if (file.fieldname.includes("headOfFamilyAvatar")) {
      headOfFamilyAvatar = file;
    } else if (file.fieldname.includes("wifeAvatar")) {
      wifeAvatar = file;
    } else if (file.fieldname.includes("sonAvatars")) {
      sonAvatars.push(file);
    } else if (file.fieldname.includes("daughterAvatars")) {
      daughterAvatars.push(file);
    }
  });

  const filesToUpload = [
    {
      file: headOfFamilyAvatar,
      fieldName: "headOfFamilyAvatar",
      fileName: `${uuidv4()}-${headOfFamilyAvatar.originalname}`,
    },
    {
      file: wifeAvatar,
      fieldName: "wifeAvatar",
      fileName: `${uuidv4()}-${headOfFamilyAvatar.originalname}`,
    },
    ...sonAvatars.map((file, index) => ({
      file,
      fieldName: `sonAvatars-${index}`,
      fileName: `${uuidv4()}-${file.originalname}`,
    })),
    ...daughterAvatars.map((file, index) => ({
      file,
      fieldName: `daughterAvatars-${index}`,
      fileName: `${uuidv4()}-${file.originalname}`,
    })),
  ];

  // const optimizedResults = await optimizeImagesRegister(filesToUpload);
  // console.log("optimizedResults >", optimizedResults);

  try {
    await Promise.all(
      filesToUpload.map(async (file) => {
        const optimzedImage = await optimzeImage(
          file.file.buffer,
          `family/${file.fileName}`
        );

        if (!optimzedImage) {
          throw new ApiError(
            500,
            "Error while OptimzeImage add donation avatar"
          );
        } else {
          if (file.fieldName.includes("headOfFamilyAvatar")) {
            headOfFamily.headOfFamilyAvatar = file.fileName;
          } else if (file.fieldName.includes("wifeAvatar")) {
            wifeDetails.wifeAvatar = file.fileName;
          } else if (file.fieldName.includes("sonAvatars")) {
            sonDetails[Number(file.fieldName.split("-")[1])].sonAvatar =
              file.fileName;
          } else if (file.fieldName.includes("daughterAvatars")) {
            daughterDetails[
              Number(file.fieldName.split("-")[1])
            ].daughterAvatar = file.fileName;
          }
        }
      })
    );

    console.log({
      password,
      headOfFamily,
      wifeDetails,
      sonDetails,
      daughterDetails,
    });

    const familyData = await Family.create({
      password,
      headOfFamily,
      wifeDetails,
      sonDetails,
      daughterDetails,
    });

    const createdData = await Family.findById(familyData._id).select(
      "-password -refreshToken"
    );

    if (!createdData) {
      throw new ApiError(500, "Something went wrong while registering");
    }

    return res
      .status(201)
      .json(new ApiResponse(200, createdData, "User registered Successfully"));
  } catch (error) {
    throw new ApiError(500, "Error while register user");
  }
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  console.log(email, password);

  if (!password && !email) {
    throw new ApiError(400, "username or email is required");
  }

  const user = await Family.findOne({ "headOfFamily.email": email });

  if (!user) {
    return res
      .status(404)
      .json(new ApiResponse(404, {}, "User does not exist!"));
  }

  const isPasswordValid = await user.isPasswordCorrect(password);
  console.log("isPasswordValid", isPasswordValid);

  if (!isPasswordValid) {
    return res
      .status(401)
      .json(new ApiResponse(401, {}, "Invalid user credentials!"));
    // throw new ApiError(401, "Invalid user credentials");
  }

  const { accessToken, refreshToken } = await generateAccessAndRefereshTokens(
    user._id
  );

  const loggedInUser = await Family.findById(user._id).select(
    "-password -refreshToken"
  );

  const option = {
    httpOnly: true,
    // secure: process.env.NODE_ENV === "production",
  };

  return res
    .status(200)
    .cookie("accessToken", accessToken)
    .cookie("refreshToken", refreshToken)
    .json(
      new ApiResponse(
        200,
        { user: loggedInUser, accessToken, refreshToken },
        "User logged in Successfully!"
      )
    );
});

const logoutUser = asyncHandler(async (req, res) => {
  await Family.findByIdAndUpdate(
    req.user._id,
    {
      $set: {
        refreshToken: undefined,
      },
    },
    {
      new: true,
    }
  );

  // const options = {
  //   // httpOnly: true,
  //   // secure: process.env.NODE_ENV === "production",
  // };

  return res
    .status(200)
    .clearCookie("accessToken")
    .clearCookie("refreshToken")
    .json(new ApiResponse(200, {}, "User logged out successfully!"));
});

const getUserDetails = asyncHandler(async (req, res) => {
  let accessToken = req?.headers?.authorization;

  if (!accessToken || accessToken == "null") {
    return res
      .status(401)
      .json(new ApiResponse(401, {}, "Unauthorized - Access Token missing"));
  }

  let decoded = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);

  if (!decoded) {
    return res
      .status(401)
      .json(new ApiResponse(401, {}, "Unauthorized - Invalid User"));
  }

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { decoded, matrimonialProfiles: req.user.matrimonialProfiles },
        ""
      )
    );
});

const getUser = asyncHandler(async (req, res) => {
  // console.log(req.params);
  try {
    const userDetails = await Family.findById(req.params.id).select(
      "-password -refreshToken"
    );

    if (!userDetails) {
      throw new ApiError(500, "User details not found!");
    }
    return res.status(200).json(new ApiResponse(200, userDetails, ""));
  } catch (error) {
    throw new ApiError(500, "Error while fetching User details");
  }
});

const findUserWithPhoneNumber = asyncHandler(async (req, res) => {
  try {
    const { phone } = req.params;
    const userDetails = await Family.findOne({
      "headOfFamily.contact": phone,
    }).select("-password -refreshToken");

    if (!userDetails) {
      return res
        .status(500)
        .json(new ApiResponse(500, "", "User details not found!"));
    }

    function generateOTP() {
      let digits = "0123456789";
      let otpLength = 6;
      let otp = "";

      for (let i = 1; i <= otpLength; i++) {
        let index = Math.floor(Math.random() * digits.length);
        otp = otp + digits[index];
      }
      return otp;
    }

    const OTP = generateOTP();
    console.log("OTP is >>", OTP);
    // const request_id = "1qsw34rfe3wdre4";
    const response = await fetch(
      `https://www.fast2sms.com/dev/bulkV2?authorization=apUwx428gMiJDqkvhVorX3mFzYKB9lnRPu5A1Oj0CHfNyL6TsINMKZp4GlTJ1Rmd8YPHxsuS2Fo6giQj&route=otp&variables_values=${OTP}&flash=0&numbers=${phone}`
    );

    const otpData = await response.json();
    console.log("findUserWithPhoneNumber OTP RESPONSE >>", otpData);

    if (otpData && otpData.return) {
      const forgotData = await Forgot.create({
        phone: phone,
        requestId: otpData.request_id,
        otp: OTP,
      });

      if (forgotData) {
        return res
          .status(200)
          .json(
            new ApiResponse(
              200,
              { forgotId: forgotData._id, phone: forgotData.phone },
              "OTP Sent Successfully"
            )
          );
      } else {
        throw new ApiError(500, "Something went wrong");
      }
    }
  } catch (error) {
    console.log("ERROR", error);
    throw new ApiError(500, "Something went wrong");
  }
});

const verifyOtp = asyncHandler(async (req, res) => {
  const { forgotId, otp } = req.body;
  try {
    const forgotData = await Forgot.findById(forgotId);
    console.log("forgotData >>", forgotData);

    if (!forgotData) {
      throw new ApiError(500, "Data not found");
    }

    const verifyOTP = forgotData.otp == otp;

    if (verifyOTP) {
      await Forgot.deleteOne({ _id: forgotData._id });
      return res
        .status(200)
        .json(new ApiResponse(200, "", "OTP Verified Successfully"));
    }
    return res.status(400).json(new ApiResponse(400, "", "Invalid OTP"));
  } catch (error) {
    console.log(error);
    throw new ApiError(500, "Error while verify otp");
  }
});

const changePassword = asyncHandler(async (req, res) => {
  const { newPassword, contact } = req.body;
  try {
    const userDetails = await Family.findOne({
      "headOfFamily.contact": contact,
    });

    if (!userDetails) {
      return res
        .status(400)
        .json(new ApiResponse(400, "", "Please try again!"));
    }

    userDetails.password = newPassword;
    await userDetails.save();
    return res
      .status(200)
      .json(new ApiResponse(200, "", "Password changed successfully"));
  } catch (error) {
    throw new ApiError(500, "Something went wrong");
  }
});

const updateUserProfile = asyncHandler(async (req, res) => {
  const { headOfFamily, wifeDetails, sonDetails, daughterDetails } = req.body;

  const updatedData = await Family.findByIdAndUpdate(
    req.params.id,
    { headOfFamily, wifeDetails, sonDetails, daughterDetails },
    {
      new: true,
    }
  );

  if (!updatedData) {
    return res
      .status(500)
      .json(new ApiResponse(500, "", "Error, while updating user details!"));
  }

  return res
    .status(200)
    .json(new ApiResponse(200, "", "User details updated!"));

  // console.log(updatedData);
});

const addSonDaughterDetails = asyncHandler(async (req, res) => {
  const {
    profileId,
    firstname,
    secondname,
    surname,
    bloodGroup,
    contact,
    education,
    dob,
    proffession,
    addDetailsTo,
  } = req.body;

  const profileImage = req.file;

  if (!profileImage) {
    throw new ApiError(400, "Profile image file is required");
  }

  const familyData = await Family.findById(profileId);

  if (!familyData) {
    throw new ApiError(400, "Family profile not found!");
  }

  const imageName = `${uuidv4()}-${profileImage.originalname}`;

  const isOptimzeImage = await optimzeImage(
    req.file.buffer,
    `family/${imageName}`
  );
  console.log("isOptimzeImage >", isOptimzeImage);

  if (!isOptimzeImage) throw new ApiError(505, "Error while optimazing image!");

  if (addDetailsTo == "son") {
    const updatedData = await Family.findByIdAndUpdate(
      profileId,
      {
        $push: {
          sonDetails: {
            surname,
            firstname,
            secondname,
            proffession,
            contact,
            education,
            bloodGroup,
            dob,
            sonAvatar: imageName,
          },
        },
      },
      { new: true }
    );

    if (!updatedData) {
      throw new ApiError(400, "Son details not added!");
    }

    return res
      .status(200)
      .json(new ApiResponse(200, updatedData, "Son details add successfully!"));
  } else if (addDetailsTo == "daughter") {
    const updatedData = await Family.findByIdAndUpdate(
      profileId,
      {
        $push: {
          daughterDetails: {
            surname,
            firstname,
            secondname,
            proffession,
            contact,
            education,
            bloodGroup,
            dob,
            daughterAvatar: imageName,
          },
        },
      },
      { new: true }
    );

    if (!updatedData) {
      throw new ApiError(400, "Daughter details not added!");
    }

    return res
      .status(200)
      .json(
        new ApiResponse(200, updatedData, "Daughter details add successfully!")
      );
  }
});

const deleteSonDaughterDetails = asyncHandler(async (req, res) => {
  const { childId, familyId, deleteDetail } = req.body;

  if (!familyId || !childId || !deleteDetail)
    throw new ApiError(400, "Family id or Son/daughter id required!");

  const familyData = await Family.findById(familyId);

  if (!familyData) throw new ApiError(400, "Family data not found!");

  if (deleteDetail === "sonDetails") {
    const updatedData = await Family.findOneAndUpdate(
      { _id: familyId },
      { $pull: { sonDetails: { _id: childId } } },
      { new: true }
    );

    if (!updatedData) {
      throw new ApiError(500, "Error while delete son details");
    }

    return res
      .status(200)
      .json(
        new ApiResponse(200, updatedData, "Son detail deleted successfully!")
      );
  } else if (deleteDetail === "daughterDetails") {
    const updatedData = await Family.findOneAndUpdate(
      { _id: familyId },
      { $pull: { daughterDetails: { _id: childId } } },
      { new: true }
    );

    if (!updatedData) {
      throw new ApiError(500, "Error while delete daughter details");
    }

    return res
      .status(200)
      .json(
        new ApiResponse(
          200,
          updatedData,
          "Daughter detail deleted successfully!"
        )
      );
  }
});

// Update profile images
const updateProfileImages = asyncHandler(async (req, res) => {
  console.log("updateProfileImages >", req.body);

  const { setAvatarTo, childObjectId, familyId } = req.body;
  const avatarLocalImage = req.file;

  if (!avatarLocalImage) throw new ApiError(400, "Image is required!");

  if (!setAvatarTo || !childObjectId || !familyId) {
    throw new ApiError(
      400,
      "setAvatarTo, childObjectId or familyId is missing!"
    );
  }

  const familyData = await Family.findById(familyId);

  if (!familyData) throw new ApiError(400, "Family data not found!");

  if (setAvatarTo == "headOfFamily") {
    console.log("headOfFamily OLD AVATAR >>", familyData.headOfFamily);
    const imagePath = `./temp/family/${familyData.headOfFamily.headOfFamilyAvatar}`;

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

    const newImageName = `${uuidv4()}-${avatarLocalImage.originalname}`;

    const isOptimzeImage = await optimzeImage(
      req.file.buffer,
      `family/${newImageName}`
    );
    console.log("isOptimzeImage >", isOptimzeImage);

    if (!isOptimzeImage)
      throw new ApiError(505, "Error while optimazing image!");

    const updatedData = await Family.findByIdAndUpdate(
      familyId,
      {
        "headOfFamily.headOfFamilyAvatar": newImageName,
      },
      { new: true }
    );

    if (!updatedData) throw new ApiError(505, "Error while updating image!");

    return res
      .status(200)
      .json(
        new ApiResponse(200, updatedData, "Head of family avatar is updated!")
      );
  } else if (setAvatarTo == "wifeDetails") {
    console.log("wifeDetails OLD AVATAR >>", familyData.wifeDetails);
    const imagePath = `./temp/family/${familyData.wifeDetails.wifeAvatar}`;

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

    const newImageName = `${uuidv4()}-${avatarLocalImage.originalname}`;

    const isOptimzeImage = await optimzeImage(
      req.file.buffer,
      `family/${newImageName}`
    );
    console.log("isOptimzeImage >", isOptimzeImage);

    if (!isOptimzeImage)
      throw new ApiError(505, "Error while optimazing image!");

    const updatedData = await Family.findByIdAndUpdate(
      familyId,
      {
        "wifeDetails.wifeAvatar": newImageName,
      },
      { new: true }
    );

    if (!updatedData) throw new ApiError(505, "Error while updating image!");

    return res
      .status(200)
      .json(new ApiResponse(200, updatedData, "Wife avatar is updated!"));
  } else if (setAvatarTo == "sonDetails") {
    const updateData = familyData.sonDetails.id(childObjectId);

    if (!updateData) throw new ApiError(505, "Son details not found!");

    console.log("updateData >>", updateData);

    const imagePath = `./temp/family/${updateData.sonAvatar}`;

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

    const newImageName = `${uuidv4()}-${avatarLocalImage.originalname}`;

    const isOptimzeImage = await optimzeImage(
      req.file.buffer,
      `family/${newImageName}`
    );
    console.log("isOptimzeImage >", isOptimzeImage);

    if (!isOptimzeImage)
      throw new ApiError(505, "Error while optimazing image!");

    const updatedData = await Family.findByIdAndUpdate(
      familyId,
      { $set: { "sonDetails.$[son].sonAvatar": newImageName } },
      { new: true, arrayFilters: [{ "son._id": childObjectId }] }
    );

    if (!updatedData) throw new ApiError(505, "Error while updating image!");

    return res
      .status(200)
      .json(new ApiResponse(200, updatedData, "Son avatar is updated!"));
  } else if (setAvatarTo == "daughterDetails") {
    const updateData = familyData.daughterDetails.id(childObjectId);

    if (!updateData) throw new ApiError(505, "Daughter details not found!");

    console.log("updateData >>", updateData);

    const imagePath = `./temp/family/${updateData.daughterAvatar}`;

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

    const newImageName = `${uuidv4()}-${avatarLocalImage.originalname}`;

    const isOptimzeImage = await optimzeImage(
      req.file.buffer,
      `family/${newImageName}`
    );

    if (!isOptimzeImage)
      throw new ApiError(505, "Error while optimazing image!");

    const updatedData = await Family.findByIdAndUpdate(
      familyId,
      { $set: { "daughterDetails.$[daughter].daughterAvatar": newImageName } },
      { new: true, arrayFilters: [{ "daughter._id": childObjectId }] }
    );

    if (!updatedData) throw new ApiError(505, "Error while updating image!");

    return res
      .status(200)
      .json(new ApiResponse(200, updatedData, "Daughter avatar is updated!"));
  }
});

// Get Village Wise Data
const villageWiseData = asyncHandler(async (req, res) => {
  try {
    const data = await Family.aggregate([
      {
        $group: {
          _id: "$headOfFamily.address", // Grouping by the village name extracted from headOfFamily.address
          totalFamily: {
            $sum: {
              $add: [
                1, // for Family
              ],
            },
          },
          totalSon: {
            $sum: {
              $add: [
                {
                  $cond: {
                    if: { $isArray: "$sonDetails" },
                    then: { $size: "$sonDetails" },
                    else: 0,
                  },
                },
              ],
            },
          },
          totalDaughter: {
            $sum: {
              $add: [
                {
                  $cond: {
                    if: { $isArray: "$daughterDetails" },
                    then: { $size: "$daughterDetails" },
                    else: 0,
                  },
                },
              ],
            },
          },
        },
      },
      {
        $project: {
          _id: 0,
          villageName: "$_id",
          totalFamily: 1,
          totalSon: 1,
          totalDaughter: 1,
        },
      },
    ]);

    if (!data) {
      throw new ApiError(505, "Error data not found!");
    }

    return res.status(200).json(new ApiResponse(200, data, ""));
  } catch (error) {
    throw new ApiError(505, "Something went wrong!");
  }
});

// Get Village Wise Family Data
const villageFamilyData = asyncHandler(async (req, res) => {
  const { villageName } = req.params;
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  try {
    const data = await Family.aggregate([
      {
        $match: {
          "headOfFamily.address": villageName, // Filter documents where headOfFamily.address matches the village name
        },
      },
      {
        $group: {
          _id: null,
          totalFamilyDataLength: { $sum: 1 }, // Count the number of documents
          familyData: {
            $push: {
              headOfFamilyName: {
                $concat: [
                  "$headOfFamily.surname",
                  " ",
                  "$headOfFamily.firstname",
                  " ",
                  "$headOfFamily.secondname",
                ],
              },
              totalFamilyMember: {
                $add: [
                  {
                    $cond: {
                      if: { $isArray: "$sonDetails" },
                      then: { $size: "$sonDetails" },
                      else: 0,
                    },
                  },
                  {
                    $cond: {
                      if: { $isArray: "$daughterDetails" },
                      then: { $size: "$daughterDetails" },
                      else: 0,
                    },
                  },
                  2, // for headOfFamily and wifeDetails
                ],
              },
              mobile: "$headOfFamily.contact",
              avatar: "$headOfFamily.headOfFamilyAvatar",
              _id: "$_id",
            },
          },
        },
      },
      {
        $project: {
          totalFamilyDataLength: 1,
          familyData: { $slice: ["$familyData", skip, limit] }, // Apply pagination to the familyData array
        },
      },
    ]);

    if (!data) {
      throw new ApiError(404, "No data found for the specified village!");
    }

    // Extracting the totalFamilyDataLength and familyData from the result
    const { totalFamilyDataLength, familyData } = data[0];

    return res
      .status(200)
      .json(new ApiResponse(200, { totalFamilyDataLength, familyData }, ""));
  } catch (error) {
    console.log("error >", error);
    throw new ApiError(505, "Something went wrong!");
  }
});

// Get Committe Data
const getVillageWiseCommitteData = asyncHandler(async (req, res) => {
  console.log("getVillageWiseCommitteData");
  const { village } = req.body;
  console.log(village);

  if (village) {
    const committeeData = await Committee.find({ village });

    if (!committeeData) {
      throw new ApiError(
        505,
        "No data found for the specified village committee!"
      );
    }

    return res.status(200).json(new ApiResponse(200, committeeData, ""));
  }
});

export {
  registerFamily,
  loginUser,
  logoutUser,
  getUserDetails,
  getUser,
  findUserWithPhoneNumber,
  deleteSonDaughterDetails,
  verifyOtp,
  changePassword,
  updateUserProfile,
  addSonDaughterDetails,
  updateProfileImages,
  villageWiseData,
  villageFamilyData,
  getVillageWiseCommitteData,
};
