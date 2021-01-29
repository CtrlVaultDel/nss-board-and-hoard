import React, { useState, createContext } from "react";

export const HoardGameContext = createContext();

export const HoardGameProvider = (props) => {
    const [hoardGames, setHoardGames] = useState([]);

    const getHoardGames = () => {
        return fetch("http://localhost:8088/userGames")
        .then(response => response.json())
        .then(setUserGames);
    };

    return (
        <UserGameContext.Provider value={{hoardGames, getHoardGames}}>
            {props.children}
        </UserGameContext.Provider>
    );
};