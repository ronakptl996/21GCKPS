import multer from "multer";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/temp");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

// const storageMemory = multer.memoryStorage();
const awsUploadMulter = multer({ dest: "public/upload" });
export const upload = multer({ storage });

export { awsUploadMulter };
