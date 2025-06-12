const express = require("express");
const router = express.Router();
const categoryModel = require("../models/Category");

// Add category route
router.post("/add-category", async (req, res) => {
  try {
    const { name, type } = req.body;

    if (!["thumbnail", "video"].includes(type)) {
      return res.status(400).json({ message: "Invalid category type" });
    }

    const existing = await categoryModel.findOne({
      name: { $regex: `^${name}$`, $options: "i" },
      type: type,
    });

    if (existing)
      return res.status(400).json({ message: "Category already exists" });

    const newCategory = new categoryModel({ name, type });
    await newCategory.save();

    res.status(201).json({ category: newCategory, success: true });
  } catch (err) {
    res.status(500).json({ message: err.message, success: false });
  }
});

// ✅ GET: All categories OR filter by type (thumbnail/video)
router.get("/categories", async (req, res) => {
  try {
    const { type } = req.query;

    // Validate type if present
    if (type && !["thumbnail", "video"].includes(type)) {
      return res.status(400).json({ message: "Invalid category type" });
    }

    // Build filter based on type
    const filter = type ? { type } : {};

    const categories = await categoryModel.find(filter).sort({ name: 1 });
    res.status(200).json(categories);
  } catch (err) {
    console.error("Error fetching categories:", err);
    res.status(500).json({ message: err.message });
  }
});

// ✅ NEW: Get categories by type (thumbnail or video)
router.get("/categories/:type", async (req, res) => {
  try {
    const { type } = req.params;

    if (!["thumbnail", "video"].includes(type)) {
      return res.status(400).json({ message: "Invalid category type" });
    }

    const categories = await categoryModel.find({ type }).sort({ name: 1 });
    res.status(200).json(categories);
  } catch (err) {
    console.error("Error fetching categories by type:", err);
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
