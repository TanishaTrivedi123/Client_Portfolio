const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const {addImage, getAllImages, deleteImage} = require("../controllers/imageController");
const upload = require("../middleware/multer");
const router = express.Router();

//-----------------route to add the image----------------
// upload.single("image") => Jab me route me likhi hu ye to tab multer form-data se file extract karta hai or uso memory me store karta hai(kyuki memoryStorage use kiya) aur req.file me daal deta hai.
router.post("/add-image", authMiddleware, upload.single("image"), addImage);

//-----------------route to get all images-----------------
router.get("/get-images", getAllImages)

//-----------------route to delete the image from database------------------
router.delete("/delete-image/:id", authMiddleware, deleteImage)

module.exports = router;