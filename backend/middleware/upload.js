// middleware/upload.js
const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../Cloudinary");

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: async (req, file) => {
    // Check MIME type to determine resource type
    const isVideo = file.mimetype.startsWith("video/");
    return {
      folder: isVideo ? "Short Videos" : "thumbnails",
      resource_type: isVideo ? "video" : "image",
    };
  },
});

const upload = multer({ storage });

module.exports = upload;
