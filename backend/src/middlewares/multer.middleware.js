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

export const upload = multer({ storage });

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
