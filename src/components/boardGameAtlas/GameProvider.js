import React, { useState, createContext } from "react";

// API key for Board Game Atlas (BGA) fetch calls 
// Note: (key.js file is also inside .gitignore)
import { key } from "../../key.js";

export const GameContext = createContext();

// Component responsible for all functions and variables related to the BGA API
export const GameProvider = (props) => {

    // games holds the array of games returned by BGA fetch calls
    const [games, setGames] = useState([]);

    // Store API Key
    const BGAkey = key();

    // ********TAKE OUT 5 GAME LIMIT LATER********
    // Used in the searchPage
    // Takes an object as an argument which holds filter information about the 
    // fetch call. The url is constructed and then sent to the BGA API in order
    // to receive and store the relevant games.
    const getGamesByFilters = (searchObject) => {
        let name = "&fuzzy_match=";
        let mechanics = "&mechanics=";
        let categories = "&categories=";
        let min_players = `&gt_min_players=${searchObject.min_players-1}`

        // Check to see if a name was passed in the searchObject
        // If they were not, leave the name variable empty
        if(searchObject.name !== ""){
            name = name + searchObject.name;
        }

        // Check to see if mechanics were passed in the searchObject
        // If they were not, leave the mechanics variable empty
        if(searchObject.mechanics !== ""){
            mechanics = mechanics + searchObject.mechanics;
        };

        // Check to see if categories were passed in the searchObject
        // If they were not, leave the categories variable empty
        if(searchObject.categories !== ""){
            categories = categories + searchObject.categories;
        };
        console.log(name, mechanics, categories)
        return fetch(`https://api.boardgameatlas.com/api/search?limit=5${name}${min_players}${categories}${mechanics}&order_by=popularity&client_id=${BGAkey}`)
        .then(response => response.json())
        .then((gamesData) => {
            setGames(gamesData.games)
        })
    };


    const getGamesById = (ids) => {
        return fetch (`https://api.boardgameatlas.com/api/search?ids=${ids.map(id => id).join(",")}&client_id=${key}`)
        .then(response => response.json())
        .then(setGames)
    };

    return (
        <GameContext.Provider value={{games, getGamesByFilters, getGamesById}}>
            {props.children}
        </GameContext.Provider>
    );
};