const multer = require("multer"); //Multer multipart/form-data request ko parse karta hai (jo file upload me use hoti hai).

//Store the file in memory store (no local folder "uploads")

const storage = multer.memoryStorage();

//It is a custom validation function
//req -> request object , file -> uploaded file ki details, cb -> callback function (accept ya reject karne ke liye)

// Jab browser file bhejta hai, wo file ke sath ek header bhejta hai: (Content-Type) ye hi memetype hai (image/jpeg, video/mp4)

//inside this function we will check the file is image or video if yes "allow" and if now this file so "reject"

const fileFilter = (req,file,cb) => {
    if(file.mimetype.startsWith("image/") || file.mimetype.startsWith("video/")){
        cb(null, true);  //iska matlab hai koi error nhi hai file accept kr lo
    }
    else{
        cb(new Error("Only images and videos are allowed"), false);  //error throw karo file reject karo
    }
};

//here i will create multer middleware

const upload = multer({
    storage,  //ye multer ko bata raha hai ki file kaha or kese store karni hai.
    limits: {fileSize: 100 * 1024 * 1024},  //100MB se badi file reject karega
    fileFilter,  //yaha me mera custom validation function attach kr rahi hu
});

module.exports = upload;