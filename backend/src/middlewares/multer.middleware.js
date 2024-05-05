import multer from "multer";
import { ApiError } from "../utils/ApiError.js";

// const storage = multer.diskStorage({
const storage = multer.memoryStorage({
  destination: function (req, file, cb) {
    console.log("storage FILE>>> ", file);
    cb(null, "./public/temp");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

// Function to validate image types
const imageFileFilter = (req, file, cb) => {
  const allowedMIMEtypes = [
    "image/jpeg",
    "image/png",
    "image/gif",
    "image/webp",
  ]; // Add valid MIME types

  if (allowedMIMEtypes.includes(file.mimetype)) {
    cb(null, true); // Accept the file
  } else {
    const error = new Error(
      "Invalid file type. Only JPEG, PNG, GIF, and WEBP are allowed."
    );
    error.status = 400; // Bad Request status
    cb(error, false); // Reject the file
  }
};

export const upload = multer({ storage, fileFilter: imageFileFilter });

// AWS file upload
const fileFilter = (req, file, cb) => {
  if (file.mimetype.split("/")[0] === "image") {
    cb(null, true);
  } else {
    throw new ApiError(400, "File must be an image");
  }
};

// const storageMemory = multer.memoryStorage();
const awsUploadMulter = multer({
  dest: "public/upload",
  storage: multer.memoryStorage(),
  fileFilter,
});

export { awsUploadMulter };
