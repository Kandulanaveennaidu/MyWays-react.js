import React, { useState, useEffect } from "react";
import "./App.css";
import CharacterCard from "./CharacterCard";

function App() {
  const [characters, setCharacters] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");

  useEffect(() => {
    fetch("https://api.disneyapi.dev/characters")
      .then((response) => response.json())
      .then((data) => setCharacters(data.data));
  }, []);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSort = (event) => {
    setSortOrder(event.target.value);
  };

  const filteredCharacters = characters.filter((character) =>
    character.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedCharacters = filteredCharacters.sort((a, b) => {
    if (sortOrder === "asc") {
      return a.name.localeCompare(b.name);
    } else {
      return b.name.localeCompare(a.name);
    }
  });

  return (
    <div className="App">
      <h1>Disney Characters</h1>
      <div className="controls">
        <input
          type="text"
          placeholder="Search Characters"
          value={searchTerm}
          onChange={handleSearch}
        />
        <label>
          Sort By:
          <select value={sortOrder} onChange={handleSort}>
            <option value="asc">Name (A-Z)</option>
            <option value="desc">Name (Z-A)</option>
          </select>
        </label>
      </div>
      <div className="character-list">
        {sortedCharacters.map((character) => (
          <CharacterCard key={character.id} character={character} />
        ))}
      </div>
    </div>
  );
}

export default App;
