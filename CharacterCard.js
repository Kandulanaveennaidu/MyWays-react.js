import React from "react";

function CharacterCard(props) {
    const { character } = props;

    return (
        <div className="character-card">
            <img src={character.imageUrl} alt={character.name} />
            <h2>{character.name}</h2>
            <p>{character.description}</p>
            <a href={character.wikiUrl} target="_blank" rel="noreferrer">
                Learn More
            </a>
        </div>
    );
}

export default CharacterCard;
