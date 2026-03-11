const express = require("express");
const Video = require("../models/videoModel");
const authMiddleware = require("../middleware/authMiddleware");
const {addVideo, getAllVideos, deleteVideo} = require("../controllers/videoController");
const upload = require("../middleware/multer");
const router = express.Router();

//-------------------route to add the video-------------------
router.post("/add-video", authMiddleware, upload.single("video"), addVideo);

//------------------route to get all videos-------------------
router.get("/get-videos", getAllVideos);

//-----------------route to delete the video from database--------------------
router.delete("/delete-video/:id", authMiddleware, deleteVideo);

module.exports = router;