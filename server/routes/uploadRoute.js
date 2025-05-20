import express from 'express';
import multer from 'multer';
import path from 'path';
import { uploadFile } from '../controllers/fileUploadController.js';

const uploadRouter = express.Router();

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(process.cwd(), 'uploads')); // Absolute path
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

// Define the file upload route
uploadRouter.post('/file', upload.single('file'), uploadFile);

export default uploadRouter;
