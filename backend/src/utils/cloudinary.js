import fs from "fs";
import { v2 as cloudinary } from "cloudinary";

// cloudinary.config({
//   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET,
// });

cloudinary.config({
  cloud_name: "rnkptl",
  api_key: "724665437943413",
  api_secret: "Z7frywqm_-y5nmJmUSiROwMBQp8",
});

const uploadOnCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) return null;
    //upload the file on cloudinary
    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
      folder: "21GCKPS",
    });
    // file has been uploaded successfull
    fs.unlinkSync(localFilePath);
    return response;
  } catch (error) {
    console.log("Cloudinary ERROR ::", error);
    fs.unlinkSync(localFilePath); // remove the locally saved temporary file as the upload operation got failed
    return null;
  }
};

export { uploadOnCloudinary };
