const mongoose = require("mongoose");

const videoSchema = new mongoose.Schema(
  {
    video: {
      url: { type: String, required: true },
      filename: { type: String, required: true },
    },
  },
  { timestamps: true }
);

const VideoModel = mongoose.model("Video", videoSchema);

module.exports = VideoModel;
