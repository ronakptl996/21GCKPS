import AWS from "aws-sdk";
import dotenv from "dotenv";
import fs from "fs";

dotenv.config({
  path: ".env",
});

const s3 = new AWS.S3({
  region: process.env.AWS_REGION,
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

const uploadImageToAWS = (file) => {
  const fileStream = fs.createReadStream(file.path);

  const uploadParam = {
    Bucket: process.env.AWS_REGION,
    Body: fileStream,
    Key: file.filename,
  };

  return s3.upload(uploadParam).promise();
};

export { uploadImageToAWS };
