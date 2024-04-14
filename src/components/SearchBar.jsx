import React, { useState } from 'react';

function SearchBar({ onSubmit }) {
    const [innerSearch, setInnerSearch] = useState("");

    return (
      <div>
        <input
          aria-labelledby="search-button"
          name="search"
          id="search"
          type="search"
          value={innerSearch}
          onChange={(e) => setInnerSearch(e.target.value)}
        />
        <button
          id="search-button"
          type="button"
          onClick={() => onSubmit(innerSearch)} // Directly use destructured prop
        >
          Search
        </button>
      </div>
    );
}

export default SearchBar;