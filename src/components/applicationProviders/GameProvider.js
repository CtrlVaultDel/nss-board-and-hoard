import React, { useState, createContext } from "react";

// API key for Board Game Atlas (BGA) fetch calls 
// Note: (key.js file is also inside .gitignore)
import BGAkey from "../../key.js";

export const GameContext = createContext();

// Component responsible for all functions and variables related to the BGA API
export const GameProvider = (props) => {

    // store the current user's ID in a local variable
    const currentUser = parseInt(localStorage.getItem('board_and_hoard_user'));

    // =============================================================================
    // ========================LOCAL STATE VARIABLES (START)========================
    // =============================================================================

    // searchGames holds an array of games for Search Page returned by BGA fetch calls
    const [searchGames, setSearchGames] = useState([]);

    // hoardGames holds an array of games for Hoard Page returned by BGA fetch
    const [hoardGames, setHoardGames] = useState([]);

    // userGameRelationId holds an array of objects that reflects the relationships in the userGame table
    // related to the current user. This will be used in conjunction with the deleteUserGame by making use of the
    // unique userGame table id
    const [userGames, setUserGames] = useState([]);

    const [isLoading, setIsLoading] = useState(true);

    // =============================================================================
    // =========================LOCAL STATE VARIABLES (END)=========================
    // =============================================================================

    // Initialization function
    const initializeRequiredAppData = () => {

    }

    // =============================================================================
    // ==================BOARD GAME ATLAS API FETCH CALLS (START)===================
    // =============================================================================

    // Used in the searchPage
    // Takes an object as an argument which holds filter information about the 
    // fetch call. The url is constructed and then sent to the BGA API in order
    // to receive and store the relevant games.
    const getSearchGames = (searchObject) => {
        let queryOptions = ["name", "mechanics", "categories", "gt_min_players"]
        let baseUrl = `https://api.boardgameatlas.com/api/search?limit=5&order_by=popularity&client_id=${BGAkey}&`
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
        .then((gamesData) => setSearchGames(gamesData.games));
    };

    // Used for Hoard Page
    // Pulls all relevant gameIds saved by the current 
    // user and makes an fetch call to Board Game Atlas with them
    const getHoardGames = (ids) => {
        let idArray = ids.map(id => id).join(",");
        return fetch (`https://api.boardgameatlas.com/api/search?ids=${idArray}&client_id=${BGAkey}`)
        .then(response => response.json())
        .then((gamesData) => setHoardGames(gamesData.games));
    };
    // =============================================================================
    // ===================BOARD GAME ATLAS API FETCH CALLS (END)====================
    // =============================================================================


    // Retrieves the relevant objects from the userGames table 
    // (Each object holds relationship information between a user, a game and its "state") 
    // [e.g. owned and played, owned and not played, etc.]
    const getUserGames = () => {
        return fetch (`http://localhost:8088/users/${currentUser}?_embed=userGames`)
        .then(response => response.json())
        .then((data) => {
            const newUserGames = data.userGames.map(userGame => userGame);
            setUserGames(newUserGames);
            getHoardGames(newUserGames.map(newUserGame => newUserGame.gameId));
        });
    };

    // Saves GameId from Board Game Atlas to local Joint Table UserGames 
    // to current user and sets default game state to 1 ("owned and played").
    const saveUserGame = (game) => {
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
        .then(getUserGames)
    };

    // Handles deleting a board game from the user's hoard page. When a board game
    // is deleted, a new array of relevant userGameIds will be saved to userGameIds
    // which will then be used to fetch the relevant games to be rendered on the hoard
    // page.
    const deleteUserGame = (id) => {
        return fetch(`http://localhost:8088/userGames/${id}`, {
            method: "DELETE"
        })
        .then(getUserGames)
    };


    //initializeRequiredAppData()
    return (
        <GameContext.Provider value={{searchGames, hoardGames, userGames, getUserGames, getSearchGames, getHoardGames, saveUserGame, deleteUserGame}}>
            {props.children}
        </GameContext.Provider>
    );
};