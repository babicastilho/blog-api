# 📚 Blog API Documentation

## 📖 Overview

The **Blog API** is a lightweight backend service built with **JSON Server** and **Express**, designed to manage blog data such as posts, authors, categories, tags, and images. It supports advanced features like pagination, sorting, filtering, and custom endpoints for data retrieval.

---

## 🚀 Features

- **CRUD Operations** for posts, authors, categories, and tags.
- **Advanced Queries**:
  - Pagination (`page`, `limit`)
  - Sorting (`sortBy`, `order`)
  - Filtering by date (`startDate`, `endDate`)
- **Search** across posts using keywords.
- **Static File Serving** for images.
- Modular **Route Structure** for scalability.

---

## 📂 Project Structure

blog-api/
├── public/
│   └── images/           # Static images folder
├── server/
│   ├── data/             # JSON data files
│   │   ├── authors.json
│   │   ├── categories.json
│   │   ├── posts.json
│   │   └── tags.json
│   ├── routes/           # Individual route files
│   │   ├── authors.js
│   │   ├── categories.js
│   │   ├── images.js
│   │   ├── posts.js
│   │   ├── search.js
│   │   └── tags.js
│   ├── index.js          # Main entry point for starting the server
│   └── server.js         # Configures the server and connects routes
├── package.json          # Project metadata and scripts
├── jest.config.js        # Jest configuration for testing
├── .gitignore            # Files and folders to ignore in Git
└── README.md             # Documentation

---

## 🛠️ Endpoints

### **Posts**

| Method | Endpoint            | Description                      |
|--------|----------------------|----------------------------------|
| GET    | `/posts`            | Retrieve all posts with pagination, sorting, and filtering. |
| GET    | `/posts/:id`        | Retrieve a single post by ID.    |
| GET    | `/categories/:id/posts` | Retrieve posts by category ID. |
| GET    | `/tags/:id/posts`   | Retrieve posts by tag ID.        |

#### Query Parameters for `/posts`
- `page` (default: `1`) - Pagination page number.
- `limit` (default: `10`) - Number of posts per page.
- `sortBy` (default: `id`) - Field to sort by (e.g., `title`, `publishedDate`).
- `order` (default: `asc`) - Sort order (`asc` or `desc`).
- `startDate` and `endDate` - Filter posts by published date range.

---

### **Authors**

| Method | Endpoint       | Description                     |
|--------|-----------------|---------------------------------|
| GET    | `/authors`     | Retrieve all authors.           |

---

### **Categories**

| Method | Endpoint         | Description                     |
|--------|-------------------|---------------------------------|
| GET    | `/categories`    | Retrieve all categories.        |
| GET    | `/categories/:id/posts` | Retrieve posts by category ID. |

---

### **Tags**

| Method | Endpoint    | Description                     |
|--------|-------------|---------------------------------|
| GET    | `/tags`     | Retrieve all tags.              |
| GET    | `/tags/:id/posts` | Retrieve posts by tag ID.    |

---

### **Search**

| Method | Endpoint      | Description                     |
|--------|---------------|---------------------------------|
| GET    | `/search?q=`  | Search posts by title keywords. |

---

### **Images**

| Method | Endpoint      | Description                     |
|--------|---------------|---------------------------------|
| GET    | `/images/list` | List all available images.      |

---

## 🔧 Setup Instructions

### Prerequisites
- Node.js `>=14.x`
- npm `>=6.x`

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/blog-api.git
   cd blog-api
  ```

2. Install dependencies:
  ```bash
  npm install
  ```

3. Run the server:
  ```bash
  npm run server
  ```

4. Access the API at:
  ```bash
  http://localhost:4000
 ```

---

## 🧪 Testing

This project uses **Jest** and **Supertest** for unit and integration testing. Below is the guide to set up and run the tests:

### Running Tests

1. Run all tests:
  ```bash
  npm test
  ```

2. View test coverage reports:
```bash
  npm run test --coverage
  ```
---

### 🛠️ Customization

#### Adding New Endpoints
You can easily add new endpoints to the server by following these steps:

1. **Create a New Route File**  
   Navigate to the `server/routes` directory and create a new file (e.g., `example.js`).
   
2. **Define the Route and Logic**  
  Write the route logic in the new file:
  ```javascript
  const express = require('express');
  const router = express.Router();

  router.get('/', (req, res) => {
      res.json({ message: 'This is an example route!' });
  });

  module.exports = router;
  ```
3. **Integrate the Route into the Server** 
  Import and use the route in `server/server.js`:
  ```javascript
  const exampleRoute = require('./routes/example');
  server.use('/example', exampleRoute);
  ```
Now your new route is accessible at `http://localhost:4000/example`.

---

### 🎨 Example Response

#### `/posts` Endpoint Response
A typical response for the `/posts` endpoint with pagination might look like this:

```json
{
  "page": 1,
  "limit": 10,
  "total": 50,
  "data": [
    {
      "id": 1,
      "title": "How to Edit Videos Like a Pro",
      "slug": "how-to-edit-videos-like-a-pro",
      "categories": [3],
      "author": 1,
      "content": "Lorem ipsum dolor sit amet...",
      "tags": [7, 12, 18],
      "publishedDate": "2024-01-01"
    }
  ]
}
```
This response includes pagination details (`page`, `limit`, `total`) and the corresponding post data.

---

### 📜 License

This project is open-source and licensed under the **MIT License**.  
You are free to use, modify, and distribute this software as per the terms of the license.  

Developed and maintained with ❤️ by **Barbara Castilho**.
