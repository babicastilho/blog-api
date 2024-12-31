const express = require("express");
const fs = require("fs");
const path = require("path");

const router = express.Router();

router.get("/list", (req, res) => {
  try {
    const imagesPath = path.join(__dirname, "../public/images");
    const files = fs.readdirSync(imagesPath);
    res.json({
      availableImages: files.filter((file) => /\.(png|jpg|jpeg|gif)$/i.test(file)),
    });
  } catch (error) {
    res.status(500).send({ error: "Failed to list images." });
  }
});

module.exports = router;
