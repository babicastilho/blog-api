const express = require("express");
const fs = require("fs");
const path = require("path");

const router = express.Router();

router.get("/", (req, res) => {
  try {
    const tags = JSON.parse(fs.readFileSync(path.join(__dirname, "../data/tags.json")));
    res.json(tags);
  } catch (error) {
    res.status(500).send({ error: "Failed to load tags data." });
  }
});

module.exports = router;
