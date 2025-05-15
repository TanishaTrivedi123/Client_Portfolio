const express = require("express");
const router = express.Router();
const upload = require("../middleware/upload");
const VideoModel = require("../models/AddVideo");

// ✅ POST: Upload a video
router.post("/add-video", upload.single("video"), async (req, res) => {
  try {
    const video = req.file;

    if (!video) {
      return res.status(400).json({
        error: "Video is required",
        success: false,
      });
    }

    const newVideo = new VideoModel({
      video: {
        url: video.path,
        filename: video.filename,
      },
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

// ✅ GET: Fetch all videos
router.get("/videos", async (req, res) => {
  try {
    const videos = await VideoModel.find().sort({ createdAt: -1 });
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
