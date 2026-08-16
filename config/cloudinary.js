import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

/**
 * Uploads a buffer (from multer's memoryStorage) to Cloudinary via a
 * stream, avoiding a temp file on disk. Resolves with the Cloudinary
 * response, which includes `secure_url` and `public_id`.
 */
export function uploadBufferToCloudinary(buffer, folder = "ashokkumar-portfolio") {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder, transformation: [{ width: 1600, crop: "limit", quality: "auto" }] },
      (error, result) => {
        if (error) return reject(error);
        resolve(result);
      }
    );
    stream.end(buffer);
  });
}

export default cloudinary;
