# 📚 Book API — Node.js + Express REST API

A clean, production-quality RESTful API for managing a collection of books, built with **Node.js** and **Express.js**. Data is stored **in memory** (no database required).

---

## ✨ Features

| Feature | Description |
|---|---|
| Full CRUD | Create, Read, Update, Delete books |
| Search | Filter books by title or author (partial match) |
| Validation | Input validation with descriptive error messages |
| Timestamps | `createdAt` and `updatedAt` on every book |
| Logger | Request logger middleware with response time |
| Error Handling | Centralised global error handler |
| Health Check | `GET /` returns API status and available endpoints |

---

## 🏗️ Folder Structure

```
book-api/
│
├── server.js               # Entry point — starts the Express server
├── package.json            # Project metadata and dependencies
│
├── data/
│   └── books.js            # In-memory array + ID generator
│
├── controllers/
│   └── bookController.js   # Business logic for each endpoint
│
├── routes/
│   └── bookRoutes.js       # Express Router — maps URLs to controllers
│
└── middleware/
    └── errorMiddleware.js  # Logger, 404 handler, global error handler
```

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) v14 or higher
- npm (comes with Node.js)

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/your-username/book-api.git

# 2. Navigate into the project folder
cd book-api

# 3. Install dependencies
npm install
```

### Running the Server

```bash
# Production mode
npm start

# Development mode (auto-restarts on file changes — requires nodemon)
npm run dev
```

The server will start at **http://localhost:3000**

---

## 📡 API Endpoints

### Base URL
```
http://localhost:3000
```

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/` | Health check |
| `GET` | `/books` | Get all books |
| `GET` | `/books?title=gatsby` | Search books by title |
| `GET` | `/books?author=orwell` | Filter books by author |
| `GET` | `/books/:id` | Get a single book by ID |
| `POST` | `/books` | Create a new book |
| `PUT` | `/books/:id` | Update a book by ID |
| `DELETE` | `/books/:id` | Delete a book by ID |

---

## 📋 Example Requests & Responses

### GET /books — Retrieve All Books

**Request**
```http
GET http://localhost:3000/books
```

**Response** `200 OK`
```json
{
  "success": true,
  "count": 3,
  "data": [
    {
      "id": 1,
      "title": "The Great Gatsby",
      "author": "F. Scott Fitzgerald",
      "createdAt": "2024-01-10T08:00:00.000Z",
      "updatedAt": "2024-01-10T08:00:00.000Z"
    },
    {
      "id": 2,
      "title": "To Kill a Mockingbird",
      "author": "Harper Lee",
      "createdAt": "2024-02-15T10:30:00.000Z",
      "updatedAt": "2024-02-15T10:30:00.000Z"
    },
    {
      "id": 3,
      "title": "1984",
      "author": "George Orwell",
      "createdAt": "2024-03-20T14:00:00.000Z",
      "updatedAt": "2024-03-20T14:00:00.000Z"
    }
  ]
}
```

---

### GET /books?title=gatsby — Search by Title

**Request**
```http
GET http://localhost:3000/books?title=gatsby
```

**Response** `200 OK`
```json
{
  "success": true,
  "count": 1,
  "data": [
    {
      "id": 1,
      "title": "The Great Gatsby",
      "author": "F. Scott Fitzgerald",
      "createdAt": "2024-01-10T08:00:00.000Z",
      "updatedAt": "2024-01-10T08:00:00.000Z"
    }
  ]
}
```

---

### GET /books/:id — Get Single Book

**Request**
```http
GET http://localhost:3000/books/1
```

**Response** `200 OK`
```json
{
  "success": true,
  "data": {
    "id": 1,
    "title": "The Great Gatsby",
    "author": "F. Scott Fitzgerald",
    "createdAt": "2024-01-10T08:00:00.000Z",
    "updatedAt": "2024-01-10T08:00:00.000Z"
  }
}
```

**Response (not found)** `404 Not Found`
```json
{
  "success": false,
  "message": "Book with ID 99 not found."
}
```

---

### POST /books — Create a New Book

**Request**
```http
POST http://localhost:3000/books
Content-Type: application/json

{
  "title": "Atomic Habits",
  "author": "James Clear"
}
```

**Response** `201 Created`
```json
{
  "success": true,
  "message": "Book created successfully.",
  "data": {
    "id": 4,
    "title": "Atomic Habits",
    "author": "James Clear",
    "createdAt": "2024-06-02T09:00:00.000Z",
    "updatedAt": "2024-06-02T09:00:00.000Z"
  }
}
```

**Response (validation error)** `400 Bad Request`
```json
{
  "success": false,
  "message": "Both 'title' and 'author' fields are required."
}
```

---

### PUT /books/:id — Update a Book

**Request**
```http
PUT http://localhost:3000/books/1
Content-Type: application/json

{
  "title": "The Great Gatsby (Revised Edition)"
}
```

**Response** `200 OK`
```json
{
  "success": true,
  "message": "Book updated successfully.",
  "data": {
    "id": 1,
    "title": "The Great Gatsby (Revised Edition)",
    "author": "F. Scott Fitzgerald",
    "createdAt": "2024-01-10T08:00:00.000Z",
    "updatedAt": "2024-06-02T09:05:00.000Z"
  }
}
```

---

### DELETE /books/:id — Delete a Book

**Request**
```http
DELETE http://localhost:3000/books/1
```

**Response** `200 OK`
```json
{
  "success": true,
  "message": "Book with ID 1 deleted successfully.",
  "data": {
    "id": 1,
    "title": "The Great Gatsby",
    "author": "F. Scott Fitzgerald",
    "createdAt": "2024-01-10T08:00:00.000Z",
    "updatedAt": "2024-01-10T08:00:00.000Z"
  }
}
```

---

## 📬 Postman Testing Guide

### Importing Into Postman

1. Open Postman → click **Import**
2. Select `Book_API.postman_collection.json` from this repository
3. All requests will appear in a **Book API** collection

### Manual Setup

Create a collection called **Book API** and add the following requests:

| # | Name | Method | URL |
|---|---|---|---|
| 1 | Health Check | GET | `http://localhost:3000/` |
| 2 | Get All Books | GET | `http://localhost:3000/books` |
| 3 | Search by Title | GET | `http://localhost:3000/books?title=gatsby` |
| 4 | Filter by Author | GET | `http://localhost:3000/books?author=orwell` |
| 5 | Get Book by ID | GET | `http://localhost:3000/books/1` |
| 6 | Create Book | POST | `http://localhost:3000/books` |
| 7 | Update Book | PUT | `http://localhost:3000/books/1` |
| 8 | Delete Book | DELETE | `http://localhost:3000/books/1` |

For **POST** and **PUT** requests:
- Select **Body** tab → **raw** → **JSON**
- Paste the JSON body shown in the examples above

---

## 🛠️ HTTP Status Codes

| Code | Meaning | When Used |
|---|---|---|
| `200` | OK | Successful GET, PUT, DELETE |
| `201` | Created | Successful POST |
| `400` | Bad Request | Validation failures, bad ID format |
| `404` | Not Found | Book ID doesn't exist, unknown route |
| `500` | Internal Server Error | Unexpected server errors |

---

## 🧰 Technologies Used

| Technology | Version | Purpose |
|---|---|---|
| Node.js | ≥14.0.0 | JavaScript runtime |
| Express.js | ^4.18.2 | Web framework |
| nodemon | ^3.0.1 | Dev auto-reload (devDependency) |

---

## 🐙 GitHub Upload Steps

```bash
# 1. Initialise Git in the project folder
git init

# 2. Stage all files
git add .

# 3. Commit
git commit -m "feat: initial Book API with CRUD, search, validation, and error handling"

# 4. Create a new repository on GitHub (via website or CLI):
#    https://github.com/new

# 5. Link your local repo to GitHub
git remote add origin https://github.com/your-username/book-api.git

# 6. Push to GitHub
git branch -M main
git push -u origin main
```

---

## 📝 License

This project is licensed under the **MIT License** — feel free to use and modify it.
