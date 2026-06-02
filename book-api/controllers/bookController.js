const { books, getNextId } = require("../data/books");

const getAllBooks = (req, res) => {
  const { title, author } = req.query;

  let result = [...books];

  if (title) {
    result = result.filter((book) =>
      book.title.toLowerCase().includes(title.toLowerCase())
    );
  }

  if (author) {
    result = result.filter((book) =>
      book.author.toLowerCase().includes(author.toLowerCase())
    );
  }

  res.status(200).json({
    success: true,
    count: result.length,
    data: result,
  });
};

const getBookById = (req, res, next) => {
  try {
    const id = parseInt(req.params.id, 10);

    if (isNaN(id)) {
      res.status(400);
      throw new Error("Invalid ID format — ID must be a number.");
    }

    const book = books.find((b) => b.id === id);

    if (!book) {
      res.status(404);
      throw new Error(`Book with ID ${id} not found.`);
    }

    res.status(200).json({ success: true, data: book });
  } catch (err) {
    next(err);
  }
};

const createBook = (req, res, next) => {
  try {
    const { title, author } = req.body;

    if (!title || !author) {
      res.status(400);
      throw new Error("Both 'title' and 'author' fields are required.");
    }

    if (typeof title !== "string" || title.trim() === "") {
      res.status(400);
      throw new Error("'title' must be a non-empty string.");
    }

    if (typeof author !== "string" || author.trim() === "") {
      res.status(400);
      throw new Error("'author' must be a non-empty string.");
    }

    const now = new Date().toISOString();

    const newBook = {
      id: getNextId(),
      title: title.trim(),
      author: author.trim(),
      createdAt: now,
      updatedAt: now,
    };

    books.push(newBook);

    res.status(201).json({
      success: true,
      message: "Book created successfully.",
      data: newBook,
    });
  } catch (err) {
    next(err);
  }
};

const updateBook = (req, res, next) => {
  try {
    const id = parseInt(req.params.id, 10);

    if (isNaN(id)) {
      res.status(400);
      throw new Error("Invalid ID format — ID must be a number.");
    }

    const bookIndex = books.findIndex((b) => b.id === id);

    if (bookIndex === -1) {
      res.status(404);
      throw new Error(`Book with ID ${id} not found.`);
    }

    const { title, author } = req.body;

    if (!title && !author) {
      res.status(400);
      throw new Error("Provide at least one field to update: 'title' or 'author'.");
    }

    if (title) {
      if (typeof title !== "string" || title.trim() === "") {
        res.status(400);
        throw new Error("'title' must be a non-empty string.");
      }
      books[bookIndex].title = title.trim();
    }

    if (author) {
      if (typeof author !== "string" || author.trim() === "") {
        res.status(400);
        throw new Error("'author' must be a non-empty string.");
      }
      books[bookIndex].author = author.trim();
    }

    books[bookIndex].updatedAt = new Date().toISOString();

    res.status(200).json({
      success: true,
      message: "Book updated successfully.",
      data: books[bookIndex],
    });
  } catch (err) {
    next(err);
  }
};

const deleteBook = (req, res, next) => {
  try {
    const id = parseInt(req.params.id, 10);

    if (isNaN(id)) {
      res.status(400);
      throw new Error("Invalid ID format — ID must be a number.");
    }

    const bookIndex = books.findIndex((b) => b.id === id);

    if (bookIndex === -1) {
      res.status(404);
      throw new Error(`Book with ID ${id} not found.`);
    }

    const [deletedBook] = books.splice(bookIndex, 1);

    res.status(200).json({
      success: true,
      message: `Book with ID ${id} deleted successfully.`,
      data: deletedBook,
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getAllBooks,
  getBookById,
  createBook,
  updateBook,
  deleteBook,
};
