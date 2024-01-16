import { Family } from "../models/family.model.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken";

export const verifyJwt = asyncHandler(async (req, _, next) => {
  try {
    const token = req.cookies?.accessToken;
    if (!token) {
      throw new ApiError(401, "Unauthorized request");
    }

    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    const user = await Family.findById(decodedToken?._id).select(
      "-password -refreshToken"
    );

    if (!user) {
      throw new ApiError(401, "Invalid Access Token");
    }

    req.user = user;
    next();
  } catch (error) {
    throw new ApiError(401, error?.message || "Invalid access token");
  }
});

export const verifyJwtAdmin = asyncHandler(async (req, res, next) => {
  try {
    const token = req.cookies?.accessToken || req.headers?.authorization;
    if (!token) {
      throw new ApiError(401, "Unauthorized request");
    }

    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    const user = await Family.findById(decodedToken?._id).select(
      "-password -refreshToken"
    );

    console.log(user.isAdmin);
    if (user.isAdmin == "true") {
      req.user = user;
      next();
    } else {
      console.log("Not admin%%^&****");
      throw new ApiError(401, "Only admin can access this route");
    }
  } catch (error) {
    throw new ApiError(401, error?.message || "Invalid access token");
  }
});
