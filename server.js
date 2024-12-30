const jsonServer = require("json-server");
const fs = require("fs");
const path = require("path");

const server = jsonServer.create();
const middlewares = jsonServer.defaults();

// Use default JSON Server middlewares
server.use(middlewares);

// Serve static files from the 'public/images' folder
server.use('/images', jsonServer.defaults({ static: path.join(__dirname, 'public/images') }));

// Fallback endpoint to list available images
server.get('/images/list', (req, res) => {
  try {
    const imagesPath = path.join(__dirname, 'public/images');
    const files = fs.readdirSync(imagesPath); // Read the contents of the images folder
    res.json({
      availableImages: files.filter((file) => /\.(png|jpg|jpeg|gif)$/i.test(file)), // List only image files
    });
  } catch (error) {
    res.status(500).send({ error: "Failed to list images." });
  }
});

// Custom endpoints that read directly from JSON files
server.get("/authors", (req, res) => {
  try {
    const authors = JSON.parse(
      fs.readFileSync(path.join(__dirname, "data", "authors.json"))
    );
    res.json(authors);
  } catch (error) {
    res.status(500).send({ error: "Failed to load authors data." });
  }
});

server.get("/categories", (req, res) => {
  try {
    const categories = JSON.parse(
      fs.readFileSync(path.join(__dirname, "data", "categories.json"))
    );
    res.json(categories);
  } catch (error) {
    res.status(500).send({ error: "Failed to load categories data." });
  }
});

server.get("/tags", (req, res) => {
  try {
    const tags = JSON.parse(
      fs.readFileSync(path.join(__dirname, "data", "tags.json"))
    );
    res.json(tags);
  } catch (error) {
    res.status(500).send({ error: "Failed to load tags data." });
  }
});

server.get("/posts", (req, res) => {
  try {
    const posts = JSON.parse(
      fs.readFileSync(path.join(__dirname, "data", "posts.json"))
    );

    const page = parseInt(req.query.page) || 1; // Default to page 1
    const limit = parseInt(req.query.limit) || 10; // Default to 10 posts per page

    const sortBy = req.query.sortBy || "id"; // Default to sorting by ID
    const order = req.query.order === "desc" ? -1 : 1; // Default to ascending order

    const startDate = req.query.startDate ? new Date(req.query.startDate) : null;
    const endDate = req.query.endDate ? new Date(req.query.endDate) : null;

    // Filter by date range
    let filteredPosts = posts;
    if (startDate || endDate) {
      filteredPosts = posts.filter((post) => {
        const postDate = new Date(post.publishedDate);
        return (
          (!startDate || postDate >= startDate) &&
          (!endDate || postDate <= endDate)
        );
      });
    }

    // Sort posts
    filteredPosts.sort((a, b) => {
      if (a[sortBy] < b[sortBy]) return -1 * order;
      if (a[sortBy] > b[sortBy]) return 1 * order;
      return 0;
    });

    // Paginate posts
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const paginatedPosts = filteredPosts.slice(startIndex, endIndex);

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

server.get('/search', (req, res) => {
  try {
    const posts = JSON.parse(fs.readFileSync(path.join(__dirname, 'data', 'posts.json')));
    const query = req.query.q ? req.query.q.toLowerCase() : '';

    const filteredPosts = posts.filter((post) => {
      const title = post.title ? post.title.toLowerCase() : '';
      const author = post.author && typeof post.author === 'string' ? post.author.toLowerCase() : '';
      const tags = Array.isArray(post.tags)
        ? post.tags
            .filter((tag) => typeof tag === 'string')
            .map((tag) => tag.toLowerCase())
        : [];

      return (
        title.includes(query) ||
        author.includes(query) ||
        tags.some((tag) => tag.includes(query))
      );
    });

    res.json(filteredPosts);
  } catch (error) {
    res.status(500).send({ error: "Failed to search posts." });
  }
});

server.get("/categories/:id/posts", (req, res) => {
  try {
    const posts = JSON.parse(
      fs.readFileSync(path.join(__dirname, "data", "posts.json"))
    );
    const categoryId = parseInt(req.params.id);

    const filteredPosts = posts.filter((post) =>
      post.categories.includes(categoryId)
    );
    res.json(filteredPosts);
  } catch (error) {
    res.status(500).send({ error: "Failed to load posts by category." });
  }
});

server.get("/tags/:id/posts", (req, res) => {
  try {
    const posts = JSON.parse(
      fs.readFileSync(path.join(__dirname, "data", "posts.json"))
    );
    const tagId = parseInt(req.params.id);

    const filteredPosts = posts.filter((post) => post.tags.includes(tagId));
    res.json(filteredPosts);
  } catch (error) {
    res.status(500).send({ error: "Failed to load posts by tag." });
  }
});

server.get("/posts/:id", (req, res) => {
  try {
    const posts = JSON.parse(
      fs.readFileSync(path.join(__dirname, "data", "posts.json"))
    );
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

// Start the server on the specified port
const PORT = process.env.PORT || 4000; // Changed from 3000 to 4000
server.listen(PORT, () => {
  console.log(`JSON Server with middleware is running on port ${PORT}`);
});
