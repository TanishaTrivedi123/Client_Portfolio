const express = require("express");
const db = require("./config/db")
const cors = require("cors");
const app = express();
require("dotenv").config();
db();

//Middleware
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 3000;

// require file route in this main js file
const authRoutes = require("./routes/authRoutes")
const imageRoutes = require("./routes/imageRoutes")
const videoRoutes = require("./routes/videoRoutes")

//now use that route
//-----------here we login the admin using password--------
app.use("/auth/admin", authRoutes);

//---------------in this route we add and get all the images--------
app.use("/media/admin", imageRoutes);

//---------------in this route we add and get all the videos
app.use("/media/admin", videoRoutes);

app.get("/", (req, res) => {
    res.send("Jai Shree Krishn");
})

app.listen(PORT, () => {
    console.log(`App is listening on PORT no. ${PORT}`);
})