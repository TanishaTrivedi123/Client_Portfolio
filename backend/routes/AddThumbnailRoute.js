const express = require("express");
const router = express.Router();
const upload = require("../middleware/upload");
const AddThumbnailModel = require("../models/AddThumbnail");

router.post("/add-thumbnail", upload.single("image"), async (req, res) => {
  try {
    const image = req.file;

    if (!image) {
      return res
        .status(400)
        .json({ error: "Image is required", success: false });
    }

    const newThumbnail = new AddThumbnailModel({
      image: {
        url: image.path,
        filename: image.filename,
      },
    });

    await newThumbnail.save();

    res.status(201).json({
      message: "Thumbnail added successfully",
      thumbnail: newThumbnail,
      success: true,
    });
  } catch (error) {
    console.error("Upload error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// GET All Thumbnails
router.get("/thumbnails", async (req, res) => {
  try {
    const thumbnails = await AddThumbnailModel.find().sort({ createdAt: -1 });
    res.status(200).json(thumbnails);
  } catch (error) {
    console.error("Fetch error:", error);
    res.status(500).json({ error: "Failed to fetch thumbnails" });
  }
});

module.exports = router;
