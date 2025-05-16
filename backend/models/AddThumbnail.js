const mongoose = require("mongoose");

const addThumbnailSchema = new mongoose.Schema(
  {
    image: {
      url: { type: String, required: true },
      filename: { type: String, required: true },
      public_id: { type: String, required: true }, // Add public_id
      resource_type: { type: String, enum: ["image"], default: "image" }, // Add resource_type
    },
  },
  { timestamps: true }
);

const addThumbnailModel = mongoose.model("Thumbnail", addThumbnailSchema);

module.exports = addThumbnailModel;
