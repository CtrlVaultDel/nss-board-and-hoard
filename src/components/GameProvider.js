import React, { useState, createContext } from "react";

// API key for Board Game Atlas (BGA) fetch calls 
// Note: (key.js file is also inside .gitignore)
import { key } from "../key.js";

export const GameContext = createContext();

// Component responsible for all functions and variables related to the BGA API
export const GameProvider = (props) => {

    // store the current user's ID in a local variable
    const currentUser = parseInt(localStorage.getItem('board_and_hoard_user'));

    // games holds an array of games returned by BGA fetch calls
    const [games, setGames] = useState([]);

    // userGameIds holds an array of game IDs that the user has saved to their hoard
    const [ userGameIds, setUserGameIds ] = useState([]);

    // Store API Key
    const BGAkey = key();

    // Used in the searchPage
    // Takes an object as an argument which holds filter information about the 
    // fetch call. The url is constructed and then sent to the BGA API in order
    // to receive and store the relevant games.
    const getGamesByFilters = (searchObject) => {
        let name = "&name=";
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
        return fetch(`https://api.boardgameatlas.com/api/search?limit=15${name}${min_players}${categories}${mechanics}&order_by=popularity&client_id=${BGAkey}`)
        .then(response => response.json())
        .then((gamesData) => setGames(gamesData.games))
    };

    // Used for Hoard Page; pulls all relevant gameIds saved by the current 
    // user and makes an fetch call to Board Game Atlas with them
    const getGamesById = (ids) => {
        return fetch (`https://api.boardgameatlas.com/api/search?ids=${ids.map(id => id).join(",")}&client_id=${key}`)
        .then(response => response.json())
        .then((gamesData) => setGames(gamesData.games))
    };

    // Saves GameId from Board Game Atlas to local Joint Table UserGames 
    // to current user and sets default game state to 1.
    const saveUserGame = (game) => {
        const currentUser = parseInt(localStorage.getItem('board_and_hoard_user'));
        const gameToSave = {
            gameId: game.id,
            userId: currentUser,
            gameState: 1
        };

        return fetch('http://localhost:8088/userGames', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(gameToSave)
        })
        .then(setGames(games))
    };

    const getUserGameIds = () => {
        return fetch (`http://localhost:8088/users/${currentUser}`)
        .then(response => response.json())
        .then((data) => {
            const gameIds = data.userGames.map(game => game.gameId);
            setUserGameIds(gameIds);
        });
    }

    return (
        <GameContext.Provider value={{games, userGameIds, getGamesByFilters, getGamesById, saveUserGame, getUserGameIds}}>
            {props.children}
        </GameContext.Provider>
    );
};