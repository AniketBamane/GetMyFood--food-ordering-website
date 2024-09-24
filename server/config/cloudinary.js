import { v2 as cloudinary } from 'cloudinary';
import dotenv from "dotenv"
dotenv.config()
// Configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, // Add your Cloudinary cloud_name
  api_key: process.env.CLOUDINARY_API_KEY,       // Add your Cloudinary API Key
  api_secret: process.env.CLOUDINARY_API_SECRET, // Add your Cloudinary API Secret
});

export const uploadFileOnCloudinary = async(file)=>{
  console.log(file)
  try{
    const base64 =  Buffer.from(file.buffer).toString("base64");
    const dataURI = `data:${file.mimetype};base64,${base64}`;
    const uploadResponse = await cloudinary.uploader.upload(dataURI,{
      folder: "user-images",
    })
    return uploadResponse.secure_url;
  }catch(err){
    throw new Error(err.message);
  }
}

export default cloudinary;
