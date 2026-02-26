import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import multer from 'multer';
import { configEnv } from './env.config.js';

cloudinary.config({
  cloud_name: configEnv.CLOUD_NAME,
  api_key: configEnv.CLOUD_API_KEY,
  api_secret: configEnv.CLOUD_API_SECRET
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'tickets_assets',
    allowed_formats: ['jpg', 'png', 'jpeg'],
    transformation: [
        { width: 400, height: 400, crop: 'fill', gravity: 'face' }
    ],
  } as any,
});

export const uploadCloud = multer({ storage });