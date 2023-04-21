import * as cloudinary from 'cloudinary';
import * as dotenv from 'dotenv';
dotenv.config();

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

export const uploadFile = async (path: any) => {
  const result = await cloudinary.v2.uploader.upload(path);
  return result.url;
};
