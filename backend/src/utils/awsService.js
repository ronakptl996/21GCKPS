import {
  S3Client,
  GetObjectCommand,
  PutObjectCommand,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import dotenv from "dotenv";
import fs from "fs";

dotenv.config({
  path: ".env",
});

const s3Client = new S3Client({
  region: "ap-south-1",
  credentials: {
    accessKeyId: "AKIAVGCF5HWQBO6D5ZZW",
    secretAccessKey: "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",
  },
});

async function generateURLToUpload(filename, contentType, buffer) {
  console.log("====FILENAME============", filename);
  console.log("====contentType============", contentType);
  console.log("====buffer============", buffer);
  const command = new PutObjectCommand({
    // Bucket: "21gckps-aws", // Private Bucket
    Bucket: "21gckps-s3",
    Key: `uploads/${filename}`,
    ContentType: contentType,
    Body: buffer,
  });

  const url = await getSignedUrl(s3Client, command);
  return url;
}

// async function init() {
//   return await putImage("Mail2.png");
// }

// async function generateURLToUpload(file) {
//   const s3Client = new S3Client({
//     region: "ap-south-1",
//     endpoint: "https://s3.amazonaws.com",
//     credentials: {
//       accessKeyId: "AKIAVGCF5HWQBO6D5ZZW",
//       secretAccessKey: "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",
//     },
//   });

//   const param = {
//     Bucket: "ap-south-1",
//     Key: `uploads/${file.filename}`,
//     Body: file.buffer,
//   };
//   return s3Client.send(new PutObjectCommand(param));
// }

export { generateURLToUpload };
