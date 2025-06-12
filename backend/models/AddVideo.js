const mongoose = require("mongoose");

const videoSchema = new mongoose.Schema(
  {
    video: {
      url: { type: String, required: true },
      filename: { type: String, required: true },
      public_id: { type: String, required: true },
      resource_type: { type: String, enum: ["video"], default: "video" },
    },
    category: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      enum: ["video"],
      required: true,
    },
    format: {
      type: String,
      enum: ["landscape", "portrait"], // ✅ new field for aspect/display
      required: true,
    },
    orientation: {
      type: String,
      enum: ["landscape", "portrait"],
      required: false,
      default: function () {
        return this.format; // Use format value as default
      },
    },
  },
  { timestamps: true }
);

// Pre-save middleware to sync orientation with format
videoSchema.pre("save", function (next) {
  if (!this.orientation) {
    this.orientation = this.format;
  }
  next();
});

const VideoModel = mongoose.model("Video", videoSchema);
module.exports = VideoModel;
