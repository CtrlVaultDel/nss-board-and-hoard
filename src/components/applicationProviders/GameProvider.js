import React, { useState, createContext } from "react";

// API key for Board Game Atlas (BGA) fetch calls 
// Note: (key.js file is also inside .gitignore)
import BGAkey from "../../key.js";

export const GameContext = createContext();

export const GameProvider = (props) => {
    // store the current user's ID in a local variable
    const currentUser = parseInt(localStorage.getItem('board_and_hoard_user'));

    // Holds an array of objects that reflects the current user's saved games in the userGame table
    const [userGames, setUserGames] = useState([]);

    // searchGames holds an array of games for Search Page returned by BGA fetch calls
    const [searchGames, setSearchGames] = useState([]);

    // Holds an array of games for Hoard Page
    const [hoardGames, setHoardGames] = useState([]);

    // Runs once when the application is opened or refreshed
    const initializeHoardPage = () => {
        if(userGames.length > 0 || hoardGames.length > 0){
            return false
        }
        fetch (`http://localhost:8088/userGames?_expand=gameState`)
        .then(response => response.json())
        .then(userGameData => {
            const newUserGames = userGameData.filter(ugd => ugd.userId === currentUser)

            setUserGames(newUserGames)
            // If userGames for this user exist, make a fetch call to BGA
            if(newUserGames.length){
                const idsToFetch = newUserGames.map(ug => ug.gameId).join(",")
                fetch (`https://api.boardgameatlas.com/api/search?ids=${idsToFetch}&client_id=${BGAkey}`)
                .then(hoardGameResponse => hoardGameResponse.json())
                .then (hoardGameData => {
                    setHoardGames(hoardGameData.games)
            })
            }
        })
    }

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

    // Saves GameId from gameObject to local Joint Table UserGames 
    // to current user and sets default game state to 1 ("owned and played").
    const saveUserGame = (gameObject) => {
        const userGameToSave = {
            gameId: gameObject.id,
            userId: currentUser,
            gameStateId: 1
        };
        return fetch('http://localhost:8088/userGames', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(userGameToSave)
        })
        // Instead of calling BoardGameAtlas to update hoardGames, append the new game to hoardGames
        .finally(() => {
            setHoardGames([...hoardGames, gameObject])
            return fetch (`http://localhost:8088/userGames?_expand=gameState`)
            .then(response => response.json())
            .then(userGameData => {
                const newUserGames = userGameData.filter(ugd => ugd.userId === currentUser)
                setUserGames(newUserGames)
            })
        })
    };

    // Handles deleting a board game from the user's hoard page. When a board game
    // is deleted, a new array of relevant userGameIds will be saved to userGameIds
    // which will then be used to fetch the relevant games to be rendered on the hoard
    // page.
    const deleteUserGame = (userGameId, hoardGameId) => {
        return fetch(`http://localhost:8088/userGames/${userGameId}`, {
            method: "DELETE"
        })
        // Instead of calling BoardGameAtlas to update hoardGames, set hoardGames to itself less the removed game
        .finally(() => {
            setHoardGames(hoardGames.filter(hg => hg.id !== hoardGameId))
            setUserGames(userGames.filter(ug => ug.id !== userGameId))
        })
    };

    return (
        <GameContext.Provider value={{initializeHoardPage, getSearchGames, searchGames, hoardGames, userGames, saveUserGame, deleteUserGame}}>
            {props.children}
        </GameContext.Provider>
    );
};