import cloudinary from '../utils/cloudinaryConfig.js';
import path from 'path';

// Upload file to Cloudinary
const uploadFile = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    const fileExtension = path.extname(req.file.originalname); // E.g., ".pdf", ".jpg"
    const mimeType = req.file.mimetype;

    // Determine the resource type based on mimeType, do not use "raw"
    // Use "raw" for PDFs to avoid unwanted color profile changes, otherwise detect type
    const resourceType = mimeType.startsWith("image/") ? "image" : "auto";
    // Upload the file to Cloudinary without transformations
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: "uploads",
      use_filename: true, // Use the original filename
      unique_filename: false, // Avoid adding unique hashes to filenames
      public_id: path.basename(req.file.originalname, fileExtension), // File name without extension
      resource_type: resourceType, // Use "auto" to store file as uploaded format (image, pdf, etc.)
      // No transformations for any file type (image or non-image)
      // delivery_type: 'upload',

    });

    // Remove file from local storage from uploads immediatelt after uploading
    // fs.unlinkSync(req.file.path);

    // Return the uploaded file URL
    res.status(200).json({
      message: 'File uploaded successfully',
      fileUrl: result.secure_url, // Yes, this is the uploaded file's URL on Cloudinary
      format: result.format || "Not detected",
      // publicId: result.public_id
    });

  } catch (error) {
    res.status(500).json({ message: 'File upload failed', error: error.message });
  }
};

export { uploadFile };
