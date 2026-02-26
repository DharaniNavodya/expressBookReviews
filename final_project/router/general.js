const express = require("express");
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;

const public_users = express.Router();

// ----------------------
// Task 7: Register
// ----------------------
public_users.post("/register", (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: "Username and password are required" });
  }

  // Check if username already exists
  const userExists = users.some((u) => u.username === username);
  if (userExists) {
    return res.status(409).json({ message: "User already exists" });
  }

  // Add user
  users.push({ username, password });
  return res.status(200).json({ message: "User registered successfully" });
});

// ----------------------
// Task 2: Get all books
// ----------------------
public_users.get("/books", (req, res) => {
  return res.status(200).send(JSON.stringify(books, null, 2));
});

// ----------------------
// Task 3: Get book by ISBN
// ----------------------
public_users.get("/isbn/:isbn", (req, res) => {
  const isbn = req.params.isbn;
  const book = books[isbn];

  if (!book) {
    return res.status(404).json({ message: "Book not found" });
  }

  return res.status(200).send(JSON.stringify(book, null, 2));
});

// ----------------------
// Task 4: Get books by author
// ----------------------
public_users.get("/author/:author", (req, res) => {
  const author = req.params.author.toLowerCase();

  const results = Object.values(books).filter(
    (b) => b.author && b.author.toLowerCase() === author
  );

  return res.status(200).send(JSON.stringify(results, null, 2));
});

// ----------------------
// Task 5: Get books by title
// ----------------------
public_users.get("/title/:title", (req, res) => {
  const title = req.params.title.toLowerCase();

  const results = Object.values(books).filter(
    (b) => b.title && b.title.toLowerCase() === title
  );

  return res.status(200).send(JSON.stringify(results, null, 2));
});

// ----------------------
// Task 6: Get book review
// ----------------------
public_users.get("/review/:isbn", (req, res) => {
  const isbn = req.params.isbn;
  const book = books[isbn];

  if (!book) {
    return res.status(404).json({ message: "Book not found" });
  }

  return res.status(200).send(JSON.stringify(book.reviews || {}, null, 2));
});

module.exports.general = public_users;
