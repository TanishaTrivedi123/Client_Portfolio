const Video = require("../models/videoModel");
const cloudinary = require("../config/cloudinary")
const streamifier = require("streamifier");  //ye package buffer ko stream me convert karta hai

//-----------------------add video to database-----------------
const addVideo = async (req,res) => {
    try{
        // Step1:- check file aai ya nhi(agar user file select nhi karega to multer "req.file" me kuch nhi daalega to undefined hoga isliye pehle check karna zaruri hai)
        if(!req.file){
            res.status(400).json({msg: "No video selected"});
        }

        const {videoType} = req.body;

        if(!videoType){
            return res.status(400).json({msg: "Video type required"});
        }

        if(!["horizontal", "reel"].includes(videoType)){
            return res.status(400).json({msg: "Invalid video Type"})
        }

        //Step2:- Cloudinary upload stream crete karo(cloudinary me upload karne ke 2 tarike hote hai:- 1) upload -> file path se  2) upload_stream -> stream se
        //kyoki hum file buffer me laae hai isliye stream version use kr rahe hai

        const uploadStream = cloudinary.uploader.upload_stream(
            {
                folder: "client_portfolio_videos",
                resource_type: "video"
            },
            async (error, result) => {
                if(error){
                    return res.status(500).json({msg: "Cloudinary upload failed"})
                }

                //Step3:- cloudinary url database me save karo
                const addNewVideo = new Video({
                    videoURL: result.secure_url,
                    videoType
                });

                await addNewVideo.save();

                return res.status(201).json({msg: "Video uploaded successfully"})
            }
        );

        //Step4:- Buffer -> Stream -> Cloudinary
        // Stream ka matlab hai data ko thoda-thoda karke flow karna instead of ek saath pura load karna.
        // req.file.buffer → multer ne jo RAM me file rakhi
        // createReadStream() → buffer ko stream me convert kiya
        // .pipe(uploadStream) → Cloudinary ko bhej diya
        streamifier.createReadStream(req.file.buffer).pipe(uploadStream);
    }
    catch(error){
        console.log(error);
        return res.status(500).json({msg: "Internal Server Error"})
    }
}

//-----------------------get all videos from database---------------------
const getAllVideos = async (req,res) => {
    try{
        const allVideos = await Video.find().sort({ createdAt: -1 });

        return res.status(200).json({msg: "Videos get successfully", data: allVideos});
    }
    catch(error){
        console.error(error);
        return res.status(500).json({msg: "Internal Server Error"})
    }
}

//----------------------------delete video from database-------------------------
const deleteVideo = async(req, res) => {
    try{
        const {id} = req.params;

        const videoToDelete = await Video.findByIdAndDelete(id);  //agar id mil gai to wo id ki video delete kr dega or usko return kr dega or agar id nhi mili to kuch delete nhi karega sidha "null" return karega

        if(!videoToDelete){  //agar value exist karti hai to wo object hoga jo truthy hota hai
            return res.status(404).json({msg: "Video not found"})
        }

        return res.status(200).json({msg: "Video was successfully deleted"});
    }
    catch(error){
        console.error(error);
        return res.status(500).json({msg: "Internal Server Error"});
    }
}

module.exports = {addVideo, getAllVideos, deleteVideo}