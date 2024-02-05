import { generateURLToUpload } from "./awsService.js";

// Upload each file to AWS S3
async function uploadFilesToS3(filesToUpload) {
  const uploadPromises = filesToUpload.map(
    async ({ file, fieldName, fileName }) => {
      const uploadEndpoint = await generateURLToUpload(fileName, file.mimetype);

      const response = await fetch(uploadEndpoint, {
        method: "PUT",
        headers: {
          "Content-Type": file.mimetype,
        },
        body: file.buffer,
      });

      if (!response.ok) {
        throw new Error(
          `Error uploading ${fieldName} to S3: ${response.statusText}`
        );
      }

      return fileName;
    }
  );

  try {
    const uploadedFiles = await Promise.all(uploadPromises);
    return uploadedFiles;
  } catch (error) {
    console.error(error);
    throw new Error("Error uploading files to S3");
  }
}

export default uploadFilesToS3;
