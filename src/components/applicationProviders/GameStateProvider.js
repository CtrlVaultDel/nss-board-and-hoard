import React, { useState, createContext, useEffect } from "react";

export const GameStateContext = createContext();

export const GameStateProvider = (props) => {
    const [gameStates, setGameStates] = useState([]);

    // Initialize the gameStates (local API: shows if a game is owned and played, owned and not played, etc.)
    useEffect(() => (getGameStates()),
    //eslint-disable-next-line
    [])
    
    const getGameStates = () => {
        return fetch("http://localhost:8088/gameStates")
        .then(response => response.json())
        .then(setGameStates);
    };
    
    return (
        <GameStateContext.Provider value={{gameStates}}>
            {props.children}
        </GameStateContext.Provider>
    );
};