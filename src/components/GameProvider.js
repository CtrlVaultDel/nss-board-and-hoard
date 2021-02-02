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

    // userGameRelationId holds an array of objects that reflects the relationships in the userGame table
    // related to the current user. This will be used in conjunction with the deleteUserGame by making use of the
    // unique userGame table id
    const [ userGames, setUserGames ] = useState([]);

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
        return fetch(`https://api.boardgameatlas.com/api/search?limit=5${name}${min_players}${categories}${mechanics}&order_by=popularity&client_id=${BGAkey}`)
        .then(response => response.json())
        .then((gamesData) => setGames(gamesData.games))
    };

    // Saves GameId from Board Game Atlas to local Joint Table UserGames 
    // to current user and sets default game state to 1 ("owned and played").
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
        .then(getUserGameIds)
    };

    // Handles deleting a board game from the user's hoard page. When a board game
    // is deleted, a new array of relevant userGameIds will be saved to userGameIds
    // which will then be used to fetch the relevant games to be rendered on the hoard
    // page.
    const deleteUserGame = (id) => {
        return fetch(`http://localhost:8088/userGames/${id}`, {
            method: "DELETE"
        })
            .then(getUserGameIds)
            .then(() => getGamesById(userGameIds))
    };


    // Retrieves the gameIds that the current user has saved to their library (hoard)
    const getUserGameIds = () => {
        return fetch (`http://localhost:8088/users/${currentUser}?_embed=userGames`)
        .then(response => response.json())
        .then((data) => {
            setUserGames(data.userGames.map(game => game));
            setUserGameIds(data.userGames.map(game => game.gameId));
        });
    };

    // Used for Hoard Page; pulls all relevant gameIds saved by the current 
    // user and makes an fetch call to Board Game Atlas with them
    const getGamesById = (ids) => {
        return fetch (`https://api.boardgameatlas.com/api/search?ids=${ids.map(id => id).join(",")}&client_id=${key}`)
        .then(response => response.json())
        .then((gamesData) => setGames(gamesData.games))
    };

    return (
        <GameContext.Provider value={{games, userGameIds, getGamesByFilters, getGamesById, saveUserGame, deleteUserGame, getUserGameIds}}>
            {props.children}
        </GameContext.Provider>
    );
};