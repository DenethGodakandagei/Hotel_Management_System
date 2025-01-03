import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import cloudinary from './cloudinaryConfig.js';

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'room_images', // Folder name in Cloudinary
    allowed_formats: ['jpg', 'png', 'jpeg'], // Accepted formats
  },
});

const upload = multer({ storage });

export default upload;
