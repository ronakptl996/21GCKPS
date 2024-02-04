import multer from "multer";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/temp");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype.split("/")[0] === "image") {
    cb(null, true);
  } else {
    cb(new multer.MulterError("LIMIT_UNEXPECTED_FILE"), false);
  }
};

// const storageMemory = multer.memoryStorage();
const awsUploadMulter = multer({
  dest: "public/upload",
  storage: multer.memoryStorage(),
  fileFilter,
});
export const upload = multer({ storage });

export { awsUploadMulter };
