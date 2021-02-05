import React, { useState, createContext, useEffect } from "react";

// API key for Board Game Atlas (BGA) fetch calls 
// Note: (key.js file is also inside .gitignore)
import BGAkey from "../../key.js";

export const GameContext = createContext();

// store the current user's ID in a local variable
const currentUser = parseInt(localStorage.getItem('board_and_hoard_user'));

// Component responsible for all functions and variables related to the BGA API
export const GameProvider = (props) => {

    // =============================================================================
    // ==================BOARD GAME ATLAS API FETCH CALLS (START)===================
    // =============================================================================

    // Used in the searchPage
    // Takes an object as an argument which holds filter information about the 
    // fetch call. The url is constructed and then sent to the BGA API in order
    // to receive and store the relevant games.
    const getSearchGames = (searchObject) => {
        let queryOptions = ["name", "mechanics", "categories", "gt_min_players"]
        let baseUrl = `https://api.boardgameatlas.com/api/search?&limit=50&order_by="popularity"&fuzzy_search="true"&client_id=${BGAkey}&`
        const fullUrl = baseUrl + queryOptions
            .map((optionName) => {
                let value = "";
                if(optionName === "gt_min_players"){
                    value = parseInt(searchObject[optionName])-1
                } else if(searchObject[optionName] !== ""){
                    value = searchObject[optionName]
                }
                return `${optionName}=${value}`;
            })
            .join("&");
        // Fetch call with specific filters
        return fetch(fullUrl)
        .then(response => response.json())
        .then(data => data.games)
        .then(setSearchGames)
    };

    // searchGames holds an array of games for Search Page returned by BGA fetch calls
    const [searchGames, setSearchGames] = useState([]);

    // Used for Hoard Page
    // Takes gameIds as an argument which then makes a fetch call to Board
    // Game Atlas for games with those specific ids
    const getHoardGames = () => {
        console.log("Calling BGA API")
        const idsToFetch = userGames.map(ug => ug.gameId).join(",")
        return fetch (`https://api.boardgameatlas.com/api/search?ids=${idsToFetch}&client_id=${BGAkey}`)
        .then(response => response.json())
        .then(gamesData => gamesData.games)
        .then(setHoardGames)
    };

    // Holds an array of games for Hoard Page
    const [hoardGames, setHoardGames] = useState([]);

    // =============================================================================
    // ==================USERGAME FETCH CALLS & FUNCTIONS (START)===================
    // =============================================================================

    // Retrieves the relevant objects from the userGames table 
    // (Each object holds relationship information between a user, a game and its "state") 
    // [e.g. owned and played, owned and not played, etc.]
    const getUserGames = () => {
        return fetch (`http://localhost:8088/userGames?_expand=gameState`)
        .then(response => response.json())
        .then((data) => data)
        .then((uGames) => {
            const newUserGames = uGames.filter(ug => ug.userId === currentUser)
            setUserGames(newUserGames)
        })
    };

    // Holds an array of objects that reflects the current user's saved games in the userGame table
    const [userGames, setUserGames] = useState([]);

    // Saves GameId from gameObject to local Joint Table UserGames 
    // to current user and sets default game state to 1 ("owned and played").
    const saveUserGame = (gameObject) => {
        const gameToSave = {
            gameId: gameObject.id,
            userId: currentUser,
            gameStateId: 1
        };
        return fetch('http://localhost:8088/userGames', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(gameToSave)
        })
        .then(getUserGames)
    };

    // Handles deleting a board game from the user's hoard page. When a board game
    // is deleted, a new array of relevant userGameIds will be saved to userGameIds
    // which will then be used to fetch the relevant games to be rendered on the hoard
    // page.
    const deleteUserGame = (userGameId) => {
        return fetch(`http://localhost:8088/userGames/${userGameId}`, {
            method: "DELETE"
        })
        .then(getUserGames)
        .then(() => {
            const newHoardGames = hoardGames.filter(hg => userGames.map(ug => ug.gameId === hg.id))
            setHoardGames(newHoardGames);
        });
    };

    return (
        <GameContext.Provider value={{getSearchGames, searchGames, getHoardGames, hoardGames, getUserGames, userGames, saveUserGame, deleteUserGame}}>
            {props.children}
        </GameContext.Provider>
    );
};