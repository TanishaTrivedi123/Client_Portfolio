const express = require("express");
const router = express.Router();
const categoryModel = require("../models/Category");

// Add category route
router.post("/add-category", async (req, res) => {
  try {
    const { name } = req.body;
    const existing = await categoryModel.findOne({
      name: { $regex: `^${name}$`, $options: "i" },
    });
    if (existing)
      return res.status(400).json({ message: "Category already exists" });

    const newCategory = new categoryModel({ name });
    await newCategory.save();
    res.status(201).json({ category: newCategory, success: true });
  } catch (err) {
    res.status(500).json({ message: err.message, success: false });
  }
});

// Get all categories
router.get("/categories", async (req, res) => {
  try {
    console.log("Received GET /categories request");
    const categories = await categoryModel.find({});
    res.status(200).json(categories);
  } catch (err) {
    console.error("Error fetching categories:", err);
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
