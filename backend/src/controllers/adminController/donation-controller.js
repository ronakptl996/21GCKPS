import fs from "fs";
import { Readable } from "stream";
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

  // console.log("==================BUFFER DATA============", req.file.buffer);
  console.log("DONATION IMAGE", donationImage);

  if (!donationImage) {
    throw new ApiError(400, "Donation image file is required");
  }

  // let binaryData;
  // // Binary Data for Image
  // fs.readFile(donationImage.path, "binary", (err, data) => {
  //   if (err) {
  //     throw new ApiError(500, "Unable to read file data");
  //     return;
  //   }
  //   binaryData = data;
  // });

  // try {
  //   const result = await generateURLToUpload(donationImage);
  //   console.log("UPLOADED FILE >>>", result);
  // } catch (error) {
  //   console.log("ERROR >>>", error);
  // }

  const fileName = `${uuidv4()}-${donationImage.originalname}`;

  console.log("==================fileName============", fileName);

  // Generate URL for upload image to AWS
  async function init() {
    return await generateURLToUpload(
      fileName,
      donationImage.mimetype,
      donationImage.buffer
    );
  }
  const uploadEndpoint = await init();

  // const fileStream = new Readable();
  // fileStream.push(donationImage.buffer);
  // fileStream.push(null);

  // const fileBlob = new Blob([donationImage.buffer], {
  //   type: donationImage.mimetype,
  // });

  const response = await fetch(uploadEndpoint, {
    method: "PUT",
    headers: {
      "Content-Type": donationImage.mimetype,
    },
    body: donationImage.buffer,
  });

  console.log("UPLOADED >>>>", response);
  // +++++++++++++++++++++++++++++++++++++++++++++++

  // Create a Blob from the binary data
  // const blobData = new Blob([binaryData], { type: donationImage.mimetype });
  // const formData = new FormData();
  // formData.append("file", blobData, { filename: donationImage.filename });

  // axios
  //   .post(uploadEndpoint, formData, {
  //     headers: {
  //       "Content-Type": "multipart/form-data",
  //     },
  //   })
  //   .then((response) => {
  //     console.log("Upload successful:", response.data);
  //   })
  //   .catch((error) => {
  //     console.error("Error uploading file:", error);
  //   });

  // const uploadImage = await s3UploadV2(donationImage);

  // console.log(uploadImage);
  // if (!uploadImage) {
  //   throw new ApiError(400, "Error, while uploading image");
  // }

  // const donationData = await Donation.create({
  //   name,
  //   totalQty,
  //   contact,
  //   description,
  //   price,
  //   image: uploadImage.url,
  // });

  // const createdData = await Donation.findById(donationData._id);

  // if (!createdData) {
  //   throw new ApiError(500, "Something went wrong while add donation details");
  // }

  // return res
  //   .status(201)
  //   .json(
  //     new ApiResponse(201, createdData, "Donation detail add successfully")
  //   );
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
  const donationImgPath = req.file?.path;

  console.log("avatarLocalPath ::", donationImgPath);
  if (!donationImgPath) {
    throw new ApiError(400, "Donation image is required");
  }

  const donationsData = await Donation.findById(donationId);

  if (!donationsData) {
    throw new ApiError(400, "Donation data not found");
  }

  const avatar = await uploadOnCloudinary(donationImgPath);

  if (!avatar) {
    throw new ApiError(400, "Donation image is required");
  }

  const updatedData = await Donation.findByIdAndUpdate(
    donationId,
    {
      $set: {
        image: avatar.url,
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
