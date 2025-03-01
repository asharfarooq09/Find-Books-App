import React from "react";
import "./Search.css"

const Search = ({query ,setQuery}) => {
  return (
    <>
      <h1>Book Store</h1>
      <input
        type="text"
        placeholder="Search books..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
    </>
  );
};

export default Search;
