const express = require("express");
const path = require("path");
const postsRoutes = require("./routes/posts");
const categoriesRoutes = require("./routes/categories");
const tagsRoutes = require("./routes/tags");
const authorsRoutes = require("./routes/authors");
const imagesRoutes = require("./routes/images");
const searchRoutes = require("./routes/search");

const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, "public/images")));

// Register routes
app.use("/posts", postsRoutes);
app.use("/categories", categoriesRoutes);
app.use("/tags", tagsRoutes);
app.use("/authors", authorsRoutes);
app.use("/images", imagesRoutes);
app.use("/search", searchRoutes);

module.exports = app;
