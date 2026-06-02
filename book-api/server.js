const express = require("express");
const bookRoutes = require("./routes/bookRoutes");
const { logger, notFound, errorHandler } = require("./middleware/errorMiddleware");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(logger);

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Book API is running!",
    version: "1.0.0",
    endpoints: {
      getAllBooks:  "GET    /books",
      getBookById: "GET    /books/:id",
      searchBooks: "GET    /books?title=&author=",
      createBook:  "POST   /books",
      updateBook:  "PUT    /books/:id",
      deleteBook:  "DELETE /books/:id",
    },
  });
});

app.use("/books", bookRoutes);

app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log("─────────────────────────────────────────");
  console.log(`  Book API Server`);
  console.log(`Running on: http://localhost:${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || "development"}`);
  console.log("─────────────────────────────────────────");
});

module.exports = app;
