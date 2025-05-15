const express = require("express");
const router = express.Router();
const dotenv = require("dotenv");
dotenv.config();

router.post("/verify-admin", async (req, res) => {
  try {
    const { secretKey } = req.body;

    // chech if the entered key matches .env key
    if (secretKey == process.env.ADMINSECRET_KEY) {
      return res.status(201).json({ Message: "Access Granted", success: true });
    } else {
      res.status(400).json({ error: "Invalid secretKey", success: false });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error", success: false });
  }
});

module.exports = router;
