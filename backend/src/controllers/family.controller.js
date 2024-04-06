import jwt from "jsonwebtoken";
import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcrypt";
import fast2sms from "fast-two-sms";
import { Family } from "../models/family.model.js";
import { Forgot } from "../models/forgot.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import uploadFilesToS3 from "../utils/uploadFilesToS3.js";
import {
  optimizeImagesRegister,
  optimzeImage,
} from "../utils/optimizeImage.js";

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

export {
  registerFamily,
  loginUser,
  logoutUser,
  getUserDetails,
  getUser,
  findUserWithPhoneNumber,
  verifyOtp,
  changePassword,
  updateUserProfile,
};
