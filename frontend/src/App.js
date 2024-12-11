import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [books, setBooks] = useState([]);
  const [newBook, setNewBook] = useState({ title: '', author: '', genre: '', year: '' });
  const [editBook, setEditBook] = useState(null);

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    const response = await axios.get('http://localhost:5000/api/books');
    setBooks(response.data);
  };

  const handleAddBook = async (e) => {
    e.preventDefault();
    await axios.post('http://localhost:5000/api/books', newBook);
    setNewBook({ title: '', author: '', genre: '', year: '' });
    fetchBooks();
  };

  const handleUpdateBook = async (e) => {
    e.preventDefault();
    await axios.put(`http://localhost:5000/api/books/${editBook._id}`, editBook);
    setEditBook(null);
    fetchBooks();
  };

  const handleDeleteBook = async (id) => {
    await axios.delete(`http://localhost:5000/api/books/${id}`);
    fetchBooks();
  };

  return (
    <div>
      <h1>Library Management System</h1>

      <form onSubmit={handleAddBook}>
        <input
          type="text"
          placeholder="Title"
          value={newBook.title}
          onChange={(e) => setNewBook({ ...newBook, title: e.target.value })}
        />
        <input
          type="text"
          placeholder="Author"
          value={newBook.author}
          onChange={(e) => setNewBook({ ...newBook, author: e.target.value })}
        />
        <input
          type="text"
          placeholder="Genre"
          value={newBook.genre}
          onChange={(e) => setNewBook({ ...newBook, genre: e.target.value })}
        />
        <input
          type="number"
          placeholder="Year"
          value={newBook.year}
          onChange={(e) => setNewBook({ ...newBook, year: e.target.value })}
        />
        <button type="submit">Add Book</button>
      </form>

      {editBook && (
        <form onSubmit={handleUpdateBook}>
          <input
            type="text"
            value={editBook.title}
            onChange={(e) => setEditBook({ ...editBook, title: e.target.value })}
          />
          <input
            type="text"
            value={editBook.author}
            onChange={(e) => setEditBook({ ...editBook, author: e.target.value })}
          />
          <input
            type="text"
            value={editBook.genre}
            onChange={(e) => setEditBook({ ...editBook, genre: e.target.value })}
          />
          <input
            type="number"
            value={editBook.year}
            onChange={(e) => setEditBook({ ...editBook, year: e.target.value })}
          />
          <button type="submit">Update Book</button>
        </form>
      )}

      <ul>
        {books.map((book) => (
          <li key={book._id}>
            <span>{book.title} by {book.author} ({book.year})</span>
            <button onClick={() => setEditBook(book)}>Edit</button>
            <button onClick={() => handleDeleteBook(book._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
