const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const dbURL = process.env.ATLASDB_URL;

const connectDB = async () => {
  try {
    await mongoose.connect(dbURL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("Database Connected Successfully");
  } catch (error) {
    console.error("Database Connection Error", error);
    process.exit(1);
  }
};

module.exports = connectDB;
