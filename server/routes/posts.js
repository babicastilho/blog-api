const express = require("express");
const fs = require("fs");
const path = require("path");

const router = express.Router();

router.get("/", (req, res) => {
  try {
    const posts = JSON.parse(fs.readFileSync(path.join(__dirname, "../data/posts.json")));
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    const sortBy = req.query.sortBy || "id";
    const order = req.query.order === "desc" ? -1 : 1;

    const startDate = req.query.startDate ? new Date(req.query.startDate) : null;
    const endDate = req.query.endDate ? new Date(req.query.endDate) : null;

    let filteredPosts = posts;
    if (startDate || endDate) {
      filteredPosts = posts.filter((post) => {
        const postDate = new Date(post.publishedDate);
        return (!startDate || postDate >= startDate) && (!endDate || postDate <= endDate);
      });
    }

    filteredPosts.sort((a, b) => {
      if (a[sortBy] < b[sortBy]) return -1 * order;
      if (a[sortBy] > b[sortBy]) return 1 * order;
      return 0;
    });

    const startIndex = (page - 1) * limit;
    const paginatedPosts = filteredPosts.slice(startIndex, startIndex + limit);

    res.json({
      page,
      limit,
      total: filteredPosts.length,
      data: paginatedPosts,
    });
  } catch (error) {
    res.status(500).send({ error: "Failed to load posts data." });
  }
});

router.get("/:id", (req, res) => {
  try {
    const posts = JSON.parse(fs.readFileSync(path.join(__dirname, "../data/posts.json")));
    const post = posts.find((p) => p.id === parseInt(req.params.id));
    if (post) {
      res.json(post);
    } else {
      res.status(404).send({ error: "Post not found" });
    }
  } catch (error) {
    res.status(500).send({ error: "Failed to load post by ID." });
  }
});

module.exports = router;
