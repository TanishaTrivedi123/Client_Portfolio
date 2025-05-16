const express = require("express");
const upload = require("../middleware/upload"); // multer with cloudinary storage
const cloudinary = require("../Cloudinary");
const Thumbnail = require("../models/AddThumbnail");
const Video = require("../models/AddVideo");

const router = express.Router();

// 🔐 Generate secure URL with overlay text
router.get("/secure-media/:resourceType/:publicId", async (req, res) => {
  const { publicId, resourceType } = req.params;

  if (resourceType !== "image" && resourceType !== "video") {
    return res.status(400).json({ error: "Invalid resource type" });
  }

  try {
    let media;

    if (resourceType === "image") {
      media = await Thumbnail.findOne({ "image.public_id": publicId });
    } else if (resourceType === "video") {
      media = await Video.findOne({ "video.public_id": publicId });
    }

    if (!media) {
      return res.status(404).json({ error: "Media not found" });
    }

    const signedUrl = cloudinary.url(publicId, {
      type: "authenticated",
      sign_url: true,
      secure: true,
      expires_at: Math.floor(Date.now() / 1000) + 300, // 5 minutes expiry
      resource_type: resourceType,
      transformation: [
        {
          overlay: {
            font_family: "Arial",
            font_size: resourceType === "video" ? 100 : 60,
            font_weight: "bold",
            text: "Anuj",
          },
          gravity: "center",
          color: "#f6c610",
          opacity: 70,
        },
      ],
    });

    res.json({ url: signedUrl });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ⬆️ Upload media securely and save to MongoDB (Thumbnail or Video model)
router.post("/upload", upload.single("file"), async (req, res) => {
  try {
    if (!req.file) {
      return res
        .status(400)
        .json({ success: false, message: "No file uploaded" });
    }

    const isVideo = req.file.mimetype.startsWith("video/");
    const resourceType = isVideo ? "video" : "image";

    // req.file.path might not be defined, use req.file.path or req.file.url depending on multer-storage-cloudinary version
    // multer-storage-cloudinary v4+ uses req.file.path as url, older versions may use req.file.url
    const url = req.file.path || req.file.url;

    if (isVideo) {
      const newVideo = new Video({
        video: {
          url: url,
          filename: req.file.filename,
          public_id: req.file.filename,
          resource_type: "video",
        },
      });
      await newVideo.save();
      return res.json({ success: true, media: newVideo });
    } else {
      const newThumbnail = new Thumbnail({
        image: {
          url: url,
          filename: req.file.filename,
          public_id: req.file.filename,
          resource_type: "image",
        },
      });
      await newThumbnail.save();
      return res.json({ success: true, media: newThumbnail });
    }
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;
