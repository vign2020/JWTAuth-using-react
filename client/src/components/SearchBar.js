import React from 'react'

export default function SearchBar({handleSearch}) {
  return (
    <div>
      <input
        type="text"
        placeholder="Search..."
        onChange={(e) => handleSearch(e.target.value)}
      />
    </div>
  );
    
}
