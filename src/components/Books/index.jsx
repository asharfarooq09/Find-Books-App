import React, { useState, useEffect } from "react";
import "./Books.css";
import Search from "../Search/Search";

const SkeletonCard = () => {
  return (
    <div className="skeleton-card">
      <div className="skeleton skeleton-img"></div>
      <div className="skeleton skeleton-text"></div>
      <div className="skeleton skeleton-text small"></div>
      <div className="skeleton skeleton-rating"></div>
    </div>
  );
};

const Books = () => {
  const [books, setBooks] = useState([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [searching, setSearching] = useState(false);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await fetch("https://api.sampleapis.com/beers/ale");
        const data = await response.json();
        setBooks(data);
      } catch (error) {
        console.error("Error fetching books:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  useEffect(() => {
    if (query) {
      setSearching(true);
      const timer = setTimeout(() => {
        setSearching(false);
      }, 500);

      return () => clearTimeout(timer);
    }
    else{
      setSearching(false);
    }
  }, [query]);

  const filteredBooks = books.filter((book) =>
    book.name?.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="container">
      <Search query={query} setQuery={setQuery} />

      <div className="book-container">
        {(loading || searching) ? (
          Array.from({ length: 6 }).map((_, index) => <SkeletonCard key={index} />)
        ) : filteredBooks.length > 0 ? (
          filteredBooks.map((book, index) => (
            <div key={index} className="book-card">
              <img className="img" src={book.image || "/default-image.png"} alt={book.name} />
              <h2>{book.name || "No Title Available"}</h2>
              <p className="price">{book.price ? `Price: ${book.price}` : "Price not available"}</p>
              <div className="ratings">
                <p className="average">⭐ {book.rating?.average || "N/A"}</p>
                <p className="reviews">📖 {book.rating?.reviews || "0"} Reviews</p>
              </div>
            </div>
          ))
        ) : (
          <p>No books found</p>
        )}
      </div>
    </div>
  );
};

export default Books;
