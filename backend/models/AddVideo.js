const mongoose = require("mongoose");

const videoSchema = new mongoose.Schema(
  {
    video: {
      url: { type: String, required: true },
      filename: { type: String, required: true },
      public_id: { type: String, required: true }, // Add public_id
      resource_type: { type: String, enum: ["video"], default: "video" }, // Add resource_type
    },
  },
  { timestamps: true }
);

const VideoModel = mongoose.model("Video", videoSchema);

module.exports = VideoModel;
