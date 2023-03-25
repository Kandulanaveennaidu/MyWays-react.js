import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
    const [characters, setCharacters] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [sortBy, setSortBy] = useState('id');

    useEffect(() => {
        axios.get('https://disneyapi.dev/characters')
            .then(response => {
                setCharacters(response.data);
            })
            .catch(error => {
                console.log(error);
            });
    }, []);

    const handleSearch = event => {
        setSearchTerm(event.target.value);
    };

    const handleSort = event => {
        setSortBy(event.target.value);
    };

    const filteredCharacters = characters.filter(character => {
        return character.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            character.movies.some(movie => movie.toLowerCase().includes(searchTerm.toLowerCase()));
    });

    const sortedCharacters = filteredCharacters.sort((a, b) => {
        if (sortBy === 'name') {
            return a.name.localeCompare(b.name);
        } else {
            return a.id - b.id;
        }
    });

    return (
        <div className="App">
            <h1>Disney Characters</h1>
            <div className="search-and-sort">
                <input type="text" placeholder="Search characters and movies" value={searchTerm} onChange={handleSearch} />
                <select value={sortBy} onChange={handleSort}>
                    <option value="id">Sort by ID</option>
                    <option value="name">Sort by Name</option>
                </select>
            </div>
            <div className="character-list">
                {sortedCharacters.map(character => (
                    <div key={character.id} className="character-card">
                        <img src={character.imageUrl} alt={character.name} />
                        <h2>{character.name}</h2>
                        <p><strong>ID:</strong> {character.id}</p>
                        <p><strong>Movies:</strong></p>
                        <ul>
                            {character.movies.map(movie => (
                                <li key={movie}>{movie}</li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default App;
