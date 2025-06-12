const express = require("express");
const router = express.Router();
const upload = require("../middleware/upload");
const VisualAsset = require("../models/VisualAssetSchema");

// Upload Route
router.post("/upload", upload.single("file"), async (req, res) => {
  try {
    const { type, position } = req.body;

    if (!req.file || !type || !position) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const mediaUrl = req.file.path || req.file.secure_url;
    if (!mediaUrl) {
      return res
        .status(500)
        .json({ message: "Upload failed. No media URL found." });
    }

    const newAsset = new VisualAsset({
      type,
      position,
      mediaUrl,
    });

    await newAsset.save();
    res.status(201).json({ message: "Asset uploaded", asset: newAsset });
  } catch (err) {
    console.error("Upload error:", err.message);
    res.status(500).json({ message: err.message || "Internal Server Error" });
  }
});

// Optional: GET assets
router.get("/", async (req, res) => {
  try {
    const assets = await VisualAsset.find().sort({ createdAt: -1 });
    res.status(200).json(assets);
  } catch (err) {
    console.error("Fetch error:", err.message);
    res.status(500).json({ message: err.message || "Internal Server Error" });
  }
});

module.exports = router;
