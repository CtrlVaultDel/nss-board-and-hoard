import React, { useState, createContext, useEffect } from "react";

export const MechanicContext = createContext();

export const MechanicProvider = (props) => {
    const [mechanics, setMechanics] = useState([]);

     // Initialize the mechanics states
     useEffect(() => (getMechanics),
    //eslint-disable-next-line
    []);

    const getMechanics = () => {
        return fetch("https://www.boardgameatlas.com/api/game/mechanics?pretty=true&client_id=JLBr5npPhV")
        .then(response => response.json())
        .then((data) => setMechanics(data.mechanics));
    };

    return (
        <MechanicContext.Provider value={{mechanics}}>
            {props.children}
        </MechanicContext.Provider>
    );
};