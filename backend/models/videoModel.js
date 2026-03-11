const mongoose = require("mongoose");

const videoSchema = new mongoose.Schema({
    videoURL: {
        type: String,
        required: true,
    },
    videoType: {
        type: String,
        enum: ["horizontal", "reel"],
        required: true
    }
}, {
    timestamps: true
})

const Video = mongoose.model("Video", videoSchema);
module.exports = Video;