const express = require("express");
const fs = require("fs");
const path = require("path");

const router = express.Router();

router.get("/", (req, res) => {
  try {
    const authors = JSON.parse(fs.readFileSync(path.join(__dirname, "../data/authors.json")));
    res.json(authors);
  } catch (error) {
    res.status(500).send({ error: "Failed to load authors data." });
  }
});

module.exports = router;
