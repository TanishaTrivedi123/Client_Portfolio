const mongoose = require("mongoose");

const visualAssetSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ["image", "video"],
    required: true,
  },
  position: {
    type: String,
    enum: ["left", "center", "right"],
    required: true,
  },
  mediaUrl: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("VisualAsset", visualAssetSchema);
