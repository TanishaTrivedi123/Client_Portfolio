const mongoose = require("mongoose");

const addThumbnailSchema = new mongoose.Schema(
  {
    image: {
      url: { type: String, required: true },
      filename: { type: String, required: true },
    },
  },
  { timestamps: true }
);

const addThumbnailModel = mongoose.model("Thumbnail", addThumbnailSchema);

module.exports = addThumbnailModel;
