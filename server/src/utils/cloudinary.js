import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadOnCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) return null;

    // 🔥 FIX: Normalize Windows path (\ → /)
    const normalizedPath = localFilePath.replace(/\\/g, "/");

    const response = await cloudinary.uploader.upload(normalizedPath, {
      resource_type: "auto", // ✅ REQUIRED for video + image
    });

    // ✅ cleanup local file after successful upload
    fs.unlinkSync(normalizedPath);

    return response;
  } catch (error) {
    console.error("Cloudinary upload failed:", error);

    // ⚠️ cleanup file if exists
    if (fs.existsSync(localFilePath)) {
      fs.unlinkSync(localFilePath);
    }

    return null;
  }
};

export { uploadOnCloudinary };
