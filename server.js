const jsonServer = require('json-server');
const fs = require('fs');
const path = require('path');

const server = jsonServer.create();
const middlewares = jsonServer.defaults();

server.use(middlewares);

// Endpoints personalizados que leem os arquivos JSON diretamente
server.get('/authors', (req, res) => {
  const authors = JSON.parse(fs.readFileSync(path.join(__dirname, 'data', 'authors.json')));
  res.json(authors);
});

server.get('/categories', (req, res) => {
  const categories = JSON.parse(fs.readFileSync(path.join(__dirname, 'data', 'categories.json')));
  res.json(categories);
});

server.get('/tags', (req, res) => {
  const tags = JSON.parse(fs.readFileSync(path.join(__dirname, 'data', 'tags.json')));
  res.json(tags);
});

server.get('/posts', (req, res) => {
  const posts = JSON.parse(fs.readFileSync(path.join(__dirname, 'data', 'posts.json')));
  res.json(posts);
});

// Endpoint para um único post por ID
server.get('/posts/:id', (req, res) => {
  const posts = JSON.parse(fs.readFileSync(path.join(__dirname, 'data', 'posts.json')));
  const post = posts.find(p => p.id === parseInt(req.params.id));
  if (post) {
    res.json(post);
  } else {
    res.status(404).send({ error: 'Post not found' });
  }
});

// Porta e inicialização do servidor
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`JSON Server with middleware is running on port ${PORT}`);
});
