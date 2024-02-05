import { Donation } from "../../models/donation.model.js";
import { ApiError } from "../../utils/ApiError.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { generateURLToUpload } from "../../utils/awsService.js";
import { uploadOnCloudinary } from "../../utils/cloudinary.js";
import { v4 as uuidv4 } from "uuid";

const addDonation = asyncHandler(async (req, res) => {
  const { name, totalQty, contact, description, price } = req.body;
  const donationImage = req.file;

  if (!donationImage) {
    throw new ApiError(400, "Donation image file is required");
  }

  const fileName = `${uuidv4()}-${donationImage.originalname}`;

  // Generate URL for upload image to AWS
  async function init() {
    return await generateURLToUpload(
      fileName,
      donationImage.mimetype,
      donationImage.buffer
    );
  }
  const uploadEndpoint = await init();

  const response = await fetch(uploadEndpoint, {
    method: "PUT",
    headers: {
      "Content-Type": donationImage.mimetype,
    },
    body: donationImage.buffer,
  });

  if (response && response.status != 200) {
    return res
      .status(500)
      .json(new ApiResponse(500, "", "Error while uploading image"));
  }

  const donationData = await Donation.create({
    name,
    totalQty,
    contact,
    description,
    price,
    image: process.env.AWS_S3_URL + fileName,
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

  const fileName = `${uuidv4()}-${donationImg.originalname}`;

  // Generate URL for upload image to AWS
  async function init() {
    return await generateURLToUpload(
      fileName,
      donationImg.mimetype,
      donationImg.buffer
    );
  }
  const uploadEndpoint = await init();

  const response = await fetch(uploadEndpoint, {
    method: "PUT",
    headers: {
      "Content-Type": donationImg.mimetype,
    },
    body: donationImg.buffer,
  });

  if (response && response.status != 200) {
    return res
      .status(500)
      .json(new ApiResponse(500, "", "Error while uploading image"));
  }

  const updatedData = await Donation.findByIdAndUpdate(
    donationId,
    {
      $set: {
        image: process.env.AWS_S3_URL + fileName,
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
