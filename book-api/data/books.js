let nextId = 4;

const books = [
  {
    id: 1,
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    createdAt: new Date("2024-01-10T08:00:00.000Z").toISOString(),
    updatedAt: new Date("2024-01-10T08:00:00.000Z").toISOString(),
  },
  {
    id: 2,
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    createdAt: new Date("2024-02-15T10:30:00.000Z").toISOString(),
    updatedAt: new Date("2024-02-15T10:30:00.000Z").toISOString(),
  },
  {
    id: 3,
    title: "1984",
    author: "George Orwell",
    createdAt: new Date("2024-03-20T14:00:00.000Z").toISOString(),
    updatedAt: new Date("2024-03-20T14:00:00.000Z").toISOString(),
  },
];

const getNextId = () => nextId++;

module.exports = { books, getNextId };
