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
    // ========================LOCAL STATE VARIABLES (START)========================
    // =============================================================================

    // Holds an array of objects that reflects the current user's saved games in the userGame table
    const [userGames, setUserGames] = useState([]);

    // searchGames holds an array of games for Search Page returned by BGA fetch calls
    const [searchGames, setSearchGames] = useState([]);

    // Holds an array of games for Hoard Page
    const [hoardGames, setHoardGames] = useState([]);

    const [loadingStates, setLoadingStates] =useState({
        userGamesLoading: false,
        hoardGamesLoading: false
    });

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

    // Used for Hoard Page
    // Takes gameIds as an argument which then makes a fetch call to Board
    // Game Atlas for games with those specific ids
    const getHoardGames = () => {
        // If there are userGames but no hoardGames, then make the call
        if(userGames.length)
        {
            const idsToFetch = userGames.map(ug => ug.gameId).join(",")
            if(idsToFetch.length > 0){
                setLoadingStates([{
                    ...loadingStates, 
                    hoardGamesLoading:true
                }])
                console.log("Getting Information from Board Game Atlas")
                return fetch (`https://api.boardgameatlas.com/api/search?ids=${idsToFetch}&client_id=${BGAkey}`)
                    .then(response => {
                        return response.json()
                    })
                    .then(gamesData => gamesData.games)
                    .then(setHoardGames)
                    .finally(() => setLoadingStates({
                        ...loadingStates, 
                        hoardGamesLoading:false
                    }))
            }
        }
    };

    // =============================================================================
    // ==================USERGAME FETCH CALLS & FUNCTIONS (START)===================
    // =============================================================================

    // Retrieves the relevant objects from the userGames table 
    // (Each object holds relationship information between a user, a game and its "state") 
    // [e.g. owned and played, owned and not played, etc.]
    const getUserGames = () => {
        // Set loading state for userGames to true (loading)
        setLoadingStates([{
            ...loadingStates, 
            userGamesLoading:true
        }])
        return fetch (`http://localhost:8088/userGames?_expand=gameState`)
        .then(response => response.json())
        .then((data) => data)
        .then((uGames) => {
            const newUserGames = uGames.filter(ug => ug.userId === currentUser)
            setUserGames(newUserGames)
            // Set loading state for userGames to true (loading)
            setLoadingStates([{
                ...loadingStates, 
                userGamesLoading:false
            }])
        })
    };

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
        // Instead of calling BoardGameAtlas to update the new hoardGames, modify the current hoardGames state manually
        .then(() => {
            // Set loading state for hoardGames to true (loading)
            setLoadingStates([{
                ...loadingStates, 
                hoardGamesLoading:true
            }])
            const newHoardGames = [...hoardGames, gameObject]
            console.log("Save button pressed, here is the old list of hoardGames", hoardGames)
            setHoardGames(newHoardGames)
            console.log("Save button pressed here is the new list of hoardGames", newHoardGames)
        })
        // Set loading state for hoardGames to false (finished loading)
        .finally(() => setLoadingStates({
            ...loadingStates, 
            hoardGamesLoading:false
        }))
    };

    // Handles deleting a board game from the user's hoard page. When a board game
    // is deleted, a new array of relevant userGameIds will be saved to userGameIds
    // which will then be used to fetch the relevant games to be rendered on the hoard
    // page.
    const deleteUserGame = (userGameId, hoardGameId) => {
        return fetch(`http://localhost:8088/userGames/${userGameId}`, {
            method: "DELETE"
        })
        .then(getUserGames)
        // Instead of calling BoardGameAtlas to update the new hoardGames, modify the current hoardGames state manually
        .then(() => {
            // Set loading state for hoardGames to false (loading)
            setLoadingStates([{
                ...loadingStates, 
                hoardGamesLoading:true
            }])
            // Save original hoardGames state, filter over it and return everything exept what was deleted
            // When finished filtering, take the newHoardGames and set the state hoardGames with its value
            let oldHoardGames = [...hoardGames]
            let newHoardGames = oldHoardGames.filter(g => g.id !== hoardGameId)
            console.log("new hoardGames that are about to be set", newHoardGames)
            setHoardGames(newHoardGames)
        })
        // Set loading state for hoardGames to false (finished loading)
        .finally(() => setLoadingStates({
            ...loadingStates, 
            hoardGamesLoading:false
        }))
    };

    // Upon initialization, get and set these states
    useEffect(() => {
        console.log("**** using useEffect inside of GameProvider.js to get userGames & hoardGames****")
        getUserGames()
        .then(getHoardGames)
         //eslint-disable-next-line
    },[])

    return (
        <GameContext.Provider value={{loadingStates, getSearchGames, searchGames, getHoardGames, hoardGames, getUserGames, userGames, saveUserGame, deleteUserGame}}>
            {props.children}
        </GameContext.Provider>
    );
};