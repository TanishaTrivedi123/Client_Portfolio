const Image = require("../models/imageModel")
const cloudinary = require("../config/cloudinary")
const streamifier = require("streamifier");  //ye package buffer ko stream me convert karta hai

//-----------------------------add image in database--------------------
const addImage = async (req, res) => {
    try{
        console.log(req.file);
        // Step1:- check file aai ya nhi(agar user file select nhi karega to multer "req.file" me kuch nhi daalega to undefined hoga isliye pehle check karna zaruri hai)
        if(!req.file){
            return res.status(400).json({msg: "No image selected"})
        }

        //Step2:- Cloudinary upload stream crete karo(cloudinary me upload karne ke 2 tarike hote hai:- 1) upload -> file path se  2) upload_stream -> stream se
        //kyoki hum file buffer me laae hai isliye stream version use kr rahe hai
        const uploadStream = cloudinary.uploader.upload_stream(
            {
            folder: "client_portfolio_images",
            resource_type: "image"
            },
            async (error, result) => {
                if(error){
                    return res.status(500).json({msg: "Cloudinary upload failed"});
                }

                //Step3:- Cloudinary url database me save karo
                const newImage = new Image({
                    imageURL: result.secure_url
                })

                await newImage.save();

                return res.status(201).json({msg: "Image uploaded successfully"});
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
        console.error(error);
        return res.status(500).json({msg: "Internal Server Error"})
    }
}

//----------------------get all images from the database---------------------
const getAllImages = async (req,res) => {
    try{
        const allImages = await Image.find().sort({ createdAt: -1 });

        return res.status(200).json({msg: "Images get Successfully", data: allImages});
    }
    catch(error){
        console.error(error);
        return res.status(500).json({msg: "Internal Server Error"})
    }
}

//----------------------delete image on the basis of their id------------------
const deleteImage = async(req,res) => {
    try{
        const {id} = req.params;

        const imageToDelete = await Image.findByIdAndDelete(id);  //agar id mil gai to wo id ki image delete kr dega or usko return kr dega or agar id nhi mili to kuch delete nhi karega sidha "null" return karega

        if(!imageToDelete){  //agar value exist karti hai to wo object hoga jo truthy hota hai
            return res.status(404).json({msg: "Image not found"})
        }

        return res.status(200).json({msg: "Image was deleted successfully"});
    }
    catch(error){
        console.error(error);
        return res.status(500).json({msg: "Internal Server Error"});
    }
}

module.exports = {addImage, getAllImages, deleteImage}

