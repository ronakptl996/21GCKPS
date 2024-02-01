import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Family } from "../models/family.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import jwt from "jsonwebtoken";

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
  // console.log("FILES >>>", req.files);

  // console.log(password, headOfFamily, wifeDetails, sonDetails, daughterDetails);

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

  // Upload avatars to Cloudinary
  const headOfFamilyAvatarResult = await uploadOnCloudinary(
    headOfFamilyAvatar.path
  );

  const wifeAvatarResult = await uploadOnCloudinary(wifeAvatar.path);

  const sonAvatarsResults = await Promise.all(
    sonAvatars.map((file) => uploadOnCloudinary(file.path))
  );
  const daughterAvatarsResults = await Promise.all(
    daughterAvatars.map((file) => uploadOnCloudinary(file.path))
  );

  // console.log("headOfFamilyAvatarResult >>", headOfFamilyAvatarResult);
  // console.log("Head of Family Avatar URL:", headOfFamilyAvatarResult.url);
  // console.log("Wife Avatar URL:", wifeAvatarResult.url);
  // console.log(
  //   "Son Avatars URLs:",
  //   sonAvatarsResults.map((result) => result.url)
  // );
  // console.log(
  //   "Daughter Avatars URLs:",
  //   daughterAvatarsResults.map((result) => result.url)
  // );

  // console.log(req.body);

  headOfFamily.headOfFamilyAvatar = headOfFamilyAvatarResult.secure_url;
  wifeDetails.wifeAvatar = wifeAvatarResult.secure_url;
  sonAvatarsResults.map(
    (image, i) => (sonDetails[i].sonAvatar = image.secure_url)
  );
  daughterAvatarsResults.map(
    (image, i) => (daughterDetails[i].daughterAvatar = image.secure_url)
  );

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
  console.log("req.user._id ::>>", req.user._id);
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

  const options = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
  };

  return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(200, {}, "User logged Out"));
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

  return res.status(200).json(new ApiResponse(200, decoded, ""));
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

    return res
      .status(200)
      .json(new ApiResponse(200, { userId: userDetails._id }, ""));
  } catch (error) {
    throw new ApiError(500, "Error while fetching User details");
  }
});

export {
  registerFamily,
  loginUser,
  logoutUser,
  getUserDetails,
  getUser,
  findUserWithPhoneNumber,
};
