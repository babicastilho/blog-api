const express = require("express");
const fs = require("fs");
const path = require("path");

const router = express.Router();

router.get("/", (req, res) => {
  try {
    const posts = JSON.parse(fs.readFileSync(path.join(__dirname, "../data/posts.json")));
    const query = req.query.q ? req.query.q.toLowerCase() : "";

    const filteredPosts = posts.filter((post) => {
      const title = post.title ? post.title.toLowerCase() : "";
      return title.includes(query);
    });

    res.json(filteredPosts);
  } catch (error) {
    res.status(500).send({ error: "Failed to search posts." });
  }
});

module.exports = router;
