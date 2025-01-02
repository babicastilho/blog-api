const express = require("express");
const fs = require("fs");
const path = require("path");

const router = express.Router();

router.get("/", (req, res) => {
  try {
    // Read and parse the authors.json file
    const authorsData = JSON.parse(fs.readFileSync(path.join(__dirname, "../data/authors.json"), "utf8"));

    // Check if the file contains an array
    if (Array.isArray(authorsData)) {
      res.json(authorsData); // Return the authors directly if it's an array
    } else {
      // If the JSON file contains a different structure, return an empty list
      res.json([]);
    }
  } catch (error) {
    res.status(500).send({ error: "Failed to load authors data." });
  }
});

module.exports = router;
