import { v2 as cloudinary } from "cloudinary";
import multer from "multer";

cloudinary.config({
  cloud_name: "dyznqolbz",
  api_key: "357134445631611",
  api_secret: "u2P7-EhT_AdoSsm4bTfS7Fy3YtE",
});

const storage = multer.memoryStorage();

async function imageUploadUtil(file) {
  const result = await cloudinary.uploader.upload(file, {
    resource_type: "auto",
  });

  return result;
}

const upload = multer({ storage });

export { upload, imageUploadUtil };