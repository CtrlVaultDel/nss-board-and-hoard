import React, { useState, createContext } from "react";
import { key } from "../../key.js";

export const GameContext = createContext();

export const GameProvider = (props) => {
    const [games, setGames] = useState([]);

    // TAKE OUT LIMIT LATER
    const getGamesByFilters = (searchObject) => {
        const name = searchObject.name;
        const min_players = searchObject.min_players;
        const categories = searchObject.categories;
        const mechanics = searchObject.mechanics;
        
        return fetch(`https://api.boardgameatlas.com/api/search?limit=5&fuzzy_match=${name}&min_players=${min_players}&categories=${categories.map(category => category.id).join(",")}&mechanics=${mechanics.map(mechanic => mechanic.id).join(",")}&client_id=${key}`)
        .then(response => response.json())
        .then(setGames);
    };

    const getGamesById = (ids) => {
        return fetch (`https://api.boardgameatlas.com/api/search?ids=${ids.map(id => id).join(",")}&client_id=${key}`)
        .then(response => response.json())
        .then(setGames);
    };

    return (
        <GameContext.Provider value={{games, getGamesByFilters, getGamesById}}>
            {props.children}
        </GameContext.Provider>
    );
};