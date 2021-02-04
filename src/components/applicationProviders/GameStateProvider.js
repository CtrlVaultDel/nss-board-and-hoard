import React, { useState, createContext } from "react";

export const GameStateContext = createContext();

export const GameStateProvider = (props) => {
    const [gameStates, setGameStates] = useState([]);

    const getGameStates = () => {
        return fetch("http://localhost:8088/gameStates")
        .then(response => response.json())
        .then(setGameStates);
    };
    
    return (
        <GameStateContext.Provider value={{gameStates, getGameStates}}>
            {props.children}
        </GameStateContext.Provider>
    );
};