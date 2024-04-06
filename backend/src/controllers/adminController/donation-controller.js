import fs from "fs";
import { v4 as uuidv4 } from "uuid";
import { Donation } from "../../models/donation.model.js";
import { ApiError } from "../../utils/ApiError.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { optimzeImage } from "../../utils/optimizeImage.js";

const addDonation = asyncHandler(async (req, res) => {
  const { name, totalQty, contact, description, price } = req.body;
  const donationImage = req.file;

  if (!donationImage) {
    throw new ApiError(400, "Donation image file is required");
  }

  const fileName = `${uuidv4()}-${donationImage.originalname}`;

  const isOptimzeImage = await optimzeImage(req.file.buffer, fileName);
  console.log("isOptimzeImage >", isOptimzeImage);

  if (!isOptimzeImage) {
    throw new ApiError(500, "Error while OptimzeImage add donation avatar");
  }

  const donationData = await Donation.create({
    name,
    totalQty,
    contact,
    description,
    price,
    image: fileName,
  });

  const createdData = await Donation.findById(donationData._id);

  if (!createdData) {
    throw new ApiError(500, "Something went wrong while add donation details");
  }

  return res
    .status(201)
    .json(
      new ApiResponse(201, createdData, "Donation detail add successfully")
    );
});

const getDonationDetails = asyncHandler(async (req, res) => {
  const donationDetails = await Donation.find();

  if (!donationDetails) {
    throw new ApiError(500, "Error while fetching donation details");
  }

  return res.status(200).json(new ApiResponse(200, donationDetails, ""));
});

const editDonationImage = asyncHandler(async (req, res) => {
  const { donationId } = req.body;
  const donationImg = req.file;

  if (!donationImg) {
    throw new ApiError(400, "Donation image is required");
  }

  const donationsData = await Donation.findById(donationId);

  if (!donationsData) {
    throw new ApiError(400, "Donation data not found");
  }

  console.log("AVATAR >", donationsData.image);
  const imagePath = `./temp/${donationsData.image}`;

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

  const newImagePath = `${uuidv4()}-${donationImg.originalname}`;

  const isOptimzeImage = await optimzeImage(req.file.buffer, newImagePath);
  console.log("isOptimzeImage >", isOptimzeImage);

  if (!isOptimzeImage) {
    throw new ApiError(
      500,
      "Error while OptimzeImage edit committee user avatar"
    );
  }

  const updatedData = await Donation.findByIdAndUpdate(
    donationId,
    {
      $set: {
        image: newImagePath,
      },
    },
    { new: true }
  );

  if (!updatedData) {
    throw new ApiError(500, "Error while edit donation image");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, updatedData, "Donation Image Updated"));
});

const editDonationDetail = asyncHandler(async (req, res) => {
  const { name, totalQty, contact, description, price, donationId } = req.body;

  const donationData = await Donation.findById(donationId);
  if (!donationData) {
    throw new ApiError(404, "Donation data not found!");
  }

  try {
    let updatedData = await Donation.findByIdAndUpdate(
      donationId,
      {
        $set: {
          name,
          totalQty,
          contact,
          description,
          price,
        },
      },
      { new: true }
    );

    if (!updatedData) {
      throw new ApiError(501, "Error while updating donation detail!");
    }

    return res
      .status(200)
      .json(
        new ApiResponse(
          200,
          updatedData,
          "Donation details updated successfully!"
        )
      );
  } catch (error) {
    throw new ApiError(
      501,
      error || "Something went wrong while updating donation detail!"
    );
  }
});

const deleteDonationData = asyncHandler(async (req, res) => {
  console.log(req.body);
  const { donationId } = req.body;

  try {
    let updatedData = await Donation.findByIdAndDelete(donationId);

    if (!updatedData) {
      throw new ApiError(404, "Donation data not found!");
    }

    return res
      .status(200)
      .json(new ApiResponse(200, updatedData, "Data deleted successfully!"));
  } catch (error) {
    throw new ApiError(
      501,
      error || "Something went wrong while deleting donation data!"
    );
  }
});

const getSpecificDonationDetail = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!id) {
    throw new ApiError(401, "Donation Id is required!");
  }
  const data = await Donation.findById(id);
  if (!data) {
    throw new ApiError(500, "Data not found!");
  }
  return res.status(200).json(new ApiResponse(200, data, ""));
});

export {
  addDonation,
  getDonationDetails,
  editDonationImage,
  editDonationDetail,
  deleteDonationData,
  getSpecificDonationDetail,
};
