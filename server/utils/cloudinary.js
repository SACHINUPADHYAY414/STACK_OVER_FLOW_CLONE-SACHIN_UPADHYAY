import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

export const uploadSingleImageCloudinary = async (path, next) => {
  try {
    const result = await cloudinary.uploader.upload(
      path,
      { format: "webp", upload_preset: process.env.CLOUDINARY_PRESET },
      (error, result) => {
        if (error) {
          return false;
        }
        return result;
      }
    );
    if (result) return result.secure_url;
  } catch (err) {
    return false;

    console.log(err);
  }
};

export const uploadSingleVideoCloudinary = async (path, next) => {
  try {
    const result = await cloudinary.uploader.upload(
      path,
      { resource_type: "video", upload_preset: process.env.CLOUDINARY_PRESET },
      (error, result) => {
        if (error) {
          return false;
        }
        return result;
      }
    );
    if (result) return result.secure_url;
  } catch (err) {
    console.log(err);
    return false;
  }
};
