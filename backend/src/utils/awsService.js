import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { SNSClient, PublishCommand } from "@aws-sdk/client-sns";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import dotenv from "dotenv";

dotenv.config({
  path: ".env",
});

// S3 Bucket
const s3Client = new S3Client({
  region: process.env.AWS_S3_REGION,
  credentials: {
    accessKeyId: process.env.AWS_S3_ACCESS_KEY,
    secretAccessKey: process.env.AWS_S3_SECRET_ACCESS_KEY,
  },
});

// SNS Client
const snsClient = new SNSClient({
  region: process.env.AWS_S3_REGION,
  credentials: {
    accessKeyId: process.env.AWS_S3_ACCESS_KEY,
    secretAccessKey: process.env.AWS_S3_SECRET_ACCESS_KEY,
  },
});

// Upload Image
async function generateURLToUpload(filename, contentType, buffer) {
  const command = new PutObjectCommand({
    Bucket: process.env.AWS_S3_BUCKET_NAME,
    Key: `uploads/${filename}`,
    ContentType: contentType,
    Body: buffer,
  });

  const url = await getSignedUrl(s3Client, command);
  return url;
}

// Send OTP
async function sendSMSMessage(sns, params) {
  const command = new PublishCommand(params);
  const message = await sns.send(command);

  return message;
}

async function OTPSend(phone) {
  const params = {
    Message: `Your OTP code is: ${Math.random().toString().substring(2, 6)}`,
    PhoneNumber: phone,
    MessageAttributes: {
      "AWS.SNS.SMS.SenderID": {
        DataType: "String",
        StringValue: "String",
      },
    },
  };

  const message = await sendSMSMessage(snsClient, params);
  console.log("message OTPSend", message);
}

export { generateURLToUpload, OTPSend };
