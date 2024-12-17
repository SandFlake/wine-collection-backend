import multer from "multer";
import path from "path";

// Multer Storage Configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Uploads folder at the project root
  },
  filename: (req, file, cb) => {
    // Add timestamp to the file name to avoid overwrites
    cb(null, `${Date.now()}${path.extname(file.originalname)}`);
  },
});

// File filter for image types
const fileFilter = (req: any, file: any, cb: any) => {
  const allowedTypes = /jpeg|jpg|png/;
  const extName = allowedTypes.test(
    path.extname(file.originalname).toLowerCase()
  );
  const mimeType = allowedTypes.test(file.mimetype);

  if (extName && mimeType) {
    cb(null, true);
  } else {
    cb(new Error("Only JPEG, JPG, and PNG files are allowed."));
  }
};

// Initialize Multer
export const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB file size limit
  fileFilter,
});
