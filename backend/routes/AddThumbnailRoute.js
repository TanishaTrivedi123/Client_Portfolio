const express = require("express");
const router = express.Router();
const upload = require("../middleware/upload");
const AddThumbnailModel = require("../models/AddThumbnail");

router.post("/add-thumbnail", upload.single("image"), async (req, res) => {
  try {
    const image = req.file;
    const { category } = req.body; // yeh bhi le lo frontend se

    if (!image) {
      return res
        .status(400)
        .json({ error: "Image is required", success: false });
    }

    const newThumbnail = new AddThumbnailModel({
      image: {
        url: image.path || image.url,
        filename: image.filename,
        public_id: image.filename,
        resource_type: "image", // 🔧 required field
      },
      category,
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

// GET /thumbnails/:categoryName
// ✅ GET /thumbnails?category=Optional
router.get("/thumbnails", async (req, res) => {
  try {
    const { category } = req.query;

    // Agar category hai to filter karo, warna saare thumbnails lao
    const filter = category ? { category } : {};
    const thumbnails = await AddThumbnailModel.find(filter).sort({
      createdAt: -1,
    });

    res.status(200).json(thumbnails);
  } catch (error) {
    console.error("Fetch thumbnails error:", error);
    res.status(500).json({ error: "Failed to fetch thumbnails" });
  }
});

module.exports = router;
