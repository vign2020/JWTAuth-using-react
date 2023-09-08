import React from 'react'
import ItemList from './ItemList'
import SearchBar from './SearchBar'

import { useState } from 'react';

export default function Func() {
    const [searchTerm, setSearchTerm] = useState('');
    const [items, setItems] = useState([
      'Apple',
      'Banana',
      'Cherry',
      'Date',
      'Fig',
      'Grape',
    ]);
  
    // Function to filter items based on search term
    const filteredItems = items.filter((item) =>
      item.toLowerCase().includes(searchTerm.toLowerCase())
    );
  
    return (
      <div>
        <h1>Item Search</h1>
        <SearchBar handleSearch={setSearchTerm} />
        <ItemList items={filteredItems} />
      </div>
    );
}
