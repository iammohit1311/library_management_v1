const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
const MONGO_URI = process.env.MONGO_URI

// Connect to MongoDB
mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log(err));

// Book Schema
const bookSchema = new mongoose.Schema({
  title: String,
  author: String,
  genre: String,
  year: Number,
});

const Book = mongoose.model('Book', bookSchema);

// CRUD Routes

// Create a new book
app.post('/api/books', async (req, res) => {
  const { title, author, genre, year } = req.body;
  const newBook = new Book({ title, author, genre, year });
  await newBook.save();
  res.json(newBook);
});

// Read all books
app.get('/api/books', async (req, res) => {
  const books = await Book.find();
  res.json(books);
});

// Update a book
app.put('/api/books/:id', async (req, res) => {
  const { id } = req.params;
  const { title, author, genre, year } = req.body;
  const updatedBook = await Book.findByIdAndUpdate(id, { title, author, genre, year }, { new: true });
  res.json(updatedBook);
});

// Delete a book
app.delete('/api/books/:id', async (req, res) => {
  const { id } = req.params;
  await Book.findByIdAndDelete(id);
  res.json({ message: 'Book deleted' });
});

const port = 5000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
