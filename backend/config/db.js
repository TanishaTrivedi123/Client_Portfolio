const mongoose = require("mongoose");

const db = async () => {
    try{
        await mongoose.connect(process.env.MONGO_ATLAS_URL);
        console.log("database was successfully connected");
    }
    catch(error){
        console.log("database was not successfully connected", error);
    }
}

module.exports = db;