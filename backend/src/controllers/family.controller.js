import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Family } from "../models/family.model.js";
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

  console.log(req.body);
  const existedUser = await Family.findOne({
    "headOfFamily.email": headOfFamily.email,
  });

  if (existedUser) {
    throw new ApiError(409, "User with email already exists");
  }

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
  // console.log("req.user._id ::>>", req.user._id);
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

export { registerFamily, loginUser, logoutUser, getUserDetails };
