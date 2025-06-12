const express = require("express");
const app = express();
const dotenv = require("dotenv");
const connectDB = require("./db");
const cors = require("cors");

// Load environment variables
dotenv.config();

// Connect to the database
connectDB();

const allowedOrigins = process.env.CLIENT_URLS.split(",");

// Set up CORS
app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

// Middleware to parse incoming requests
app.use(express.json({ limit: "20mb" })); // To handle larger payloads if needed

// Test Route
app.get("/", (req, res) => {
  res.send("Jai Shree Krishn");
});

// Import and use routes
const adminRoute = require("./routes/AdminRoute");
const addThumbnailRoute = require("./routes/AddThumbnailRoute");
const addShortVideoRoute = require("./routes/AddShortVideoRoute");
const mediaRoute = require("./routes/mediaRoute");
const categoryRoute = require("./routes/categoryRoutes");
const VisualAssetRoute = require("./routes/VisualAssetRoute");

app.use("/", adminRoute);
app.use("/", addThumbnailRoute);
app.use("/", addShortVideoRoute);
app.use("/", mediaRoute);
app.use("/", categoryRoute);
app.use("/assets", VisualAssetRoute);

// Set the port to listen on
const PORT = process.env.PORT || 5000;

// Start the server
app.listen(PORT, () => {
  console.log(`App is successfully running on port ${PORT}`);
});
