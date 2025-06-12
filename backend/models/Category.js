const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: ["thumbnail", "video"],
    required: true,
  },
});

// ✅ Important fix: prevents model overwrite in dev
const categoryModel =
  mongoose.models.Category || mongoose.model("Category", categorySchema);

module.exports = categoryModel;
