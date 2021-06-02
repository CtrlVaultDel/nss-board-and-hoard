// React
import React, { useState, createContext, useEffect } from "react";

/* ===================================================== */

export const GameStateContext = createContext();

export const GameStateProvider = (props) => {

    // Used to store and update state of gameStates
    const [gameStates, setGameStates] = useState([]);
    
    // Loads response from local API for gameStates
    // Converts the response to a JS Object 
    // Returns resulting data
    const loadGameStates = () => {
        return fetch("http://localhost:8088/gameStates")
        .then(response => response.json())
    };
    
     // Combines the loading and setting of gameStates
    const getGameStates = () => {
        loadGameStates()
        .then(setGameStates);
    };

    // Initialize the gameStates (local API: shows if a game is owned and played, owned and not played, etc.)
    //eslint-disable-next-line
    useEffect(() => getGameStates(), [])

    return (
        <GameStateContext.Provider value={{gameStates}}>
            {props.children}
        </GameStateContext.Provider>
    );
};