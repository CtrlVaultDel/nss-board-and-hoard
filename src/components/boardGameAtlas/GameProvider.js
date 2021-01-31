import React, { useState, createContext } from "react";

// API key for Board Game Atlas (BGA) fetch calls 
// Note: (key.js file is also inside .gitignore)
import { key } from "../../key.js";

export const GameContext = createContext();

// Component responsible for all functions and variables related to the BGA API
export const GameProvider = (props) => {

    // games holds the array of games returned by BGA fetch calls
    const [games, setGames] = useState([]);

    // ********TAKE OUT 5 GAME LIMIT LATER********
    // Used in the searchPage
    // Takes an object as an argument which holds filter information about the 
    // fetch call. The url is constructed and then sent to the BGA API in order
    // to receive and store the relevant games.
    const getGamesByFilters = (searchObject) => {
        return fetch(`https://api.boardgameatlas.com/api/search?limit=5&fuzzy_match=${searchObject.name}&min_players=${searchObject.min_players}&categories=${searchObject.categories}&mechanics=${searchObject.mechanics}&client_id=${key}`)
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