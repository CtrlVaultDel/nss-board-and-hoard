import React, { useState, createContext } from "react";

export const UserGameContext = createContext();

export const UserGameProvider = (props) => {
    const [userGames, setUserGames] = useState([]);

    const getUserGames = () => {
        return fetch("http://localhost:8088/userGames")
        .then(response => response.json())
        .then(setUserGames);
    };

    return (
        <UserGameContext.Provider value={{userGames, getUserGames}}>
            {props.children}
        </UserGameContext.Provider>
    );
};