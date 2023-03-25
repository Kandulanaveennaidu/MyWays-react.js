import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

function App() {
    const [characters, setCharacters] = useState([]);

    useEffect(() => {
        axios
            .get("https://api.disneyapi.dev/characters")
            .then((response) => {
                setCharacters(response.data.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    const sortBy = (key) => {
        setCharacters((prevCharacters) =>
            prevCharacters.sort((a, b) => (a[key] > b[key] ? 1 : -1))
        );
    };

    return (
        <div className="App">
            <h1>Disney Characters</h1>
            <button onClick={() => sortBy("name")}>Sort by Name</button>
            <button onClick={() => sortBy("id")}>Sort by ID</button>
            <ul>
                {characters.map((character) => (
                    <li key={character.id}>
                        <img src={character.imageUrl} alt={character.name} />
                        <h2>{character.name}</h2>
                        <p>{character.url}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default App;
