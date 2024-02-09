import { Matrimonial } from "../models/matrimonial.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { generateURLToUpload } from "../utils/awsService.js";
import { v4 as uuidv4 } from "uuid";

const addMatrimonial = asyncHandler(async (req, res) => {
  const matrimonialImage = req.file;
  if (!matrimonialImage) {
    throw new ApiError(400, "Matrimonial image is required");
  }

  let { data } = req.body;

  let { profileDetail, sonDetails } = JSON.parse(data);

  const existedProfile = await Matrimonial.findOne({
    contact: profileDetail.contact,
  });

  if (existedProfile) {
    return res
      .status(401)
      .json(new ApiResponse(401, [], "Profile with contact already exists"));
  }

  const fileName = `${uuidv4()}-${matrimonialImage.originalname}`;

  // Generate URL for upload image to AWS
  async function init() {
    return await generateURLToUpload(
      fileName,
      matrimonialImage.mimetype,
      matrimonialImage.buffer
    );
  }
  const uploadEndpoint = await init();

  const response = await fetch(uploadEndpoint, {
    method: "PUT",
    headers: {
      "Content-Type": matrimonialImage.mimetype,
    },
    body: matrimonialImage.buffer,
  });

  if (response && response.status != 200) {
    return res
      .status(500)
      .json(new ApiResponse(500, "", "Error while uploading image"));
  }

  const matrimonialData = await Matrimonial.create({
    fullName: profileDetail.fullName,
    fatherName: profileDetail.fatherName,
    motherName: profileDetail.motherName,
    education: profileDetail.education,
    profession: profileDetail.profession,
    gender: profileDetail.gender,
    achievement: profileDetail.achievement,
    facebookUserName: profileDetail.facebookUserName,
    instagramUserName: profileDetail.instagramUserName,
    contact: profileDetail.contact,
    bloodGroup: profileDetail.bloodGroup,
    maternalUncle: profileDetail.maternalUncle,
    mamaVillageName: profileDetail.mamaVillageName,
    address: profileDetail.address,
    dob: profileDetail.dob,
    interest: profileDetail.interest,
    hobby: profileDetail.hobby,
    yourSelf: profileDetail.yourSelf,
    brotherSisterDetails: sonDetails,
    photo: process.env.AWS_S3_URL + fileName,
  });
  // console.log("matrimonialData ::", matrimonialData);

  const createdData = await Matrimonial.findById(matrimonialData._id);

  if (!createdData) {
    throw new ApiError(500, "Error while add matrimonial details");
  }

  return res
    .status(201)
    .json(new ApiResponse(201, createdData, "Matrimonial profile created!"));
});

const getMatrimonial = asyncHandler(async (req, res) => {
  const matrimonialDetails = await Matrimonial.find().sort({ _id: -1 });
  if (!matrimonialDetails) {
    throw new ApiError(500, "Error while fetching matrimonial details");
  }
  return res.status(200).json(new ApiResponse(200, matrimonialDetails, ""));
});

const getUserMatrimonial = asyncHandler(async (req, res) => {
  if (req.params.id) {
    const user = await Matrimonial.findById(req.params.id);

    if (user) {
      return res.status(200).json(new ApiResponse(200, user, ""));
    } else {
      throw new ApiError(500, "User not found");
    }
  } else {
    throw new ApiError(401, "UserId not found!");
  }
});

const searchMatrimonialProfile = asyncHandler(async (req, res) => {
  let { gender, age, village } = req.query;
  let dobLowerLimit = "";
  let dobUpperLimit = "";
  let dobCondition = {};

  if (gender.includes("Select")) {
    gender = "";
  }
  if (age.includes("Select")) {
    age = "";
  }
  if (age.includes("-")) {
    let ageSplit = age.split("-");
    let ageLowerLimit = Number(ageSplit[0]);
    let ageUpperLimit = Number(ageSplit[1]);

    const currentDate = new Date();
    dobLowerLimit = new Date(
      currentDate.getFullYear() - ageUpperLimit - 1,
      currentDate.getMonth(),
      currentDate.getDate()
    ).toISOString();
    dobUpperLimit = new Date(
      currentDate.getFullYear() - ageLowerLimit,
      currentDate.getMonth(),
      currentDate.getDate()
    ).toISOString();

    dobCondition = {
      dob: { $gte: dobLowerLimit, $lte: dobUpperLimit },
    };
  }

  try {
    const baseQuery = {};

    if (gender) {
      baseQuery.gender = gender;
    }

    if (village) {
      baseQuery.address = village;
    }

    const query = {
      $and: [baseQuery, dobCondition],
    };

    const searchResults = await Matrimonial.find(query);
    // Send the results to the frontend
    return res.status(200).json(new ApiResponse(200, searchResults, ""));
  } catch (error) {
    console.log("ERROR : searchMatrimonialProfile", error);
    throw new ApiError(501, "Error, while searching matrimonial user");
  }
});

export {
  addMatrimonial,
  getMatrimonial,
  getUserMatrimonial,
  searchMatrimonialProfile,
};
