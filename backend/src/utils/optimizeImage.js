import sharp from "sharp";

const optimzeImage = async (buffer, imageName) => {
  return new Promise((resolve, reject) => {
    sharp(buffer)
      .resize({ width: 400 })
      .toBuffer((err, buffer, info) => {
        if (err) {
          console.error("Error:", err);
          reject(err);
        } else {
          let outputSharp = sharp(buffer);

          // Determine output format based on input image format
          switch (info.format) {
            case "jpeg":
              outputSharp = outputSharp.jpeg({ quality: 80 }); // Set JPEG quality to 80%
              break;
            case "png":
              outputSharp = outputSharp.png({ quality: 80 }); // Set PNG quality to 80%
              break;
            case "webp":
              outputSharp = outputSharp.webp({ quality: 80 }); // Set WebP quality to 80%
              break;
            // Add cases for other formats if needed
            default:
              console.error("Unsupported image format:", info.format);
              reject(new Error(`Unsupported image format: ${info.format}`));
              return;
          }

          outputSharp.toFile(`./temp/${imageName}`, (err, info) => {
            if (err) {
              console.error("Error:", err);
              reject(err);
            } else {
              console.log("Image resized and compressed successfully");
              resolve(info);
            }
          });
        }
      });
  });
};

const convertToWebP = async (buffer, outputPath, quality = 50) => {
  return new Promise((resolve, reject) => {
    sharp(buffer)
      .webp({ quality }) // Convert to WebP with specified quality
      .toFile(`./temp/${outputPath}`, (err, info) => {
        if (err) {
          console.error("Error:", err);
          reject(err);
        } else {
          console.log("Image converted and compressed successfully");
          resolve(info);
        }
      });
  });
};

export { optimzeImage, convertToWebP };
