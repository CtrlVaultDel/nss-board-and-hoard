// React
import React, { useState, createContext, useEffect } from "react";

/* ===================================================== */

export const MechanicContext = createContext();

export const MechanicProvider = (props) => {

    // Used to store and update state of mechanics
    const [mechanics, setMechanics] = useState([]);

    // Loads response from external API for mechanics
    // Converts the response to a JS Object 
    // Returns resulting data
    const loadMechanics = () => {
        return fetch("https://www.boardgameatlas.com/api/game/mechanics?pretty=true&client_id=JLBr5npPhV")
        .then(response => response.json())
        .then(data => data.mechanics);
    };

    // Combines the loading and setting of mechanics
    const getMechanics = () => {
        loadMechanics()
        .then(setMechanics);
    };

    // Initialize the mechanics state
    //eslint-disable-next-line
    useEffect(() => getMechanics(), []);

    return (
        <MechanicContext.Provider value={{mechanics}}>
            {props.children}
        </MechanicContext.Provider>
    );
};