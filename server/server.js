const jsonServer = require("json-server");
const express = require("express");
const path = require("path");

// Create the server
const server = jsonServer.create();
const middlewares = jsonServer.defaults();

// Middleware
server.use(middlewares);

// Serve static files from the "public/images" folder
server.use("/images", express.static(path.join(__dirname, "public/images")));

// Load individual routes
const authors = require("./data/authors.json");
const categories = require("./data/categories.json");
const posts = require("./data/posts.json");
const tags = require("./data/tags.json");

// Define routes manually
server.get("/authors", (req, res) => {
  res.json(authors);
});

server.get("/categories", (req, res) => {
  res.json(categories);
});

server.get("/posts", (req, res) => {
  res.json(posts);
});

server.get("/tags", (req, res) => {
  res.json(tags);
});

// Example search endpoint
server.get("/search", (req, res) => {
  const query = req.query.q || "";
  const results = posts.filter((post) =>
    post.title.toLowerCase().includes(query.toLowerCase())
  );
  res.json(results);
});

module.exports = server; // Export the server
