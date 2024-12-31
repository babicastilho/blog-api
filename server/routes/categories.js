const express = require("express");
const fs = require("fs");
const path = require("path");

const router = express.Router();

router.get("/", (req, res) => {
  try {
    const categories = JSON.parse(fs.readFileSync(path.join(__dirname, "../data/categories.json")));
    res.json(categories);
  } catch (error) {
    res.status(500).send({ error: "Failed to load categories data." });
  }
});

router.get("/:id/posts", (req, res) => {
  try {
    const posts = JSON.parse(fs.readFileSync(path.join(__dirname, "../data/posts.json")));
    const categoryId = parseInt(req.params.id);

    const filteredPosts = posts.filter((post) => post.categories.includes(categoryId));
    res.json(filteredPosts);
  } catch (error) {
    res.status(500).send({ error: "Failed to load posts by category." });
  }
});

module.exports = router;
