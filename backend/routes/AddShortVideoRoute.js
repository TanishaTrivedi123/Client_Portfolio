const express = require("express");
const router = express.Router();
const upload = require("../middleware/upload");
const VideoModel = require("../models/AddVideo");
const CategoryModel = require("../models/Category");

// ✅ POST: Upload a video
router.post("/add-video", upload.single("video"), async (req, res) => {
  try {
    const video = req.file;
    const { category } = req.body;
    const format = req.body.format?.toLowerCase();

    if (!video || !category || !format) {
      return res.status(400).json({
        error: "Video, category and format are required",
        success: false,
      });
    }

    // ✅ Find category object
    const categoryObj = await CategoryModel.findOne({ name: category });

    if (!categoryObj) {
      return res.status(404).json({
        error: "Category not found",
        success: false,
      });
    }

    // ✅ Validate format
    const validFormats = ["landscape", "portrait"];
    if (!validFormats.includes(format)) {
      return res.status(400).json({
        error: "Invalid video format. Allowed: landscape or portrait",
        success: false,
      });
    }

    const newVideo = new VideoModel({
      video: {
        url: video.path || video.url || video.secure_url,
        filename:
          video.filename || video.original_filename || video.originalname,
        public_id: video.public_id || video.filename || Date.now().toString(),
        resource_type: "video",
      },
      category: categoryObj.name,
      type: categoryObj.type, // ✅ from DB
      format, // ✅ validated above
    });

    await newVideo.save();

    res.status(201).json({
      message: "Video uploaded successfully",
      video: newVideo,
      success: true,
    });
  } catch (error) {
    console.error("Upload error:", error);
    res.status(500).json({
      error: "Internal server error",
      success: false,
    });
  }
});

// ✅ GET /videos?category=optional
router.get("/videos", async (req, res) => {
  try {
    const { category } = req.query;

    const filter = category ? { category } : {};
    const videos = await VideoModel.find(filter).sort({ createdAt: -1 });

    res.status(200).json(videos);
  } catch (error) {
    console.error("Fetch error:", error);
    res.status(500).json({
      error: "Failed to fetch videos",
      success: false,
    });
  }
});

module.exports = router;
