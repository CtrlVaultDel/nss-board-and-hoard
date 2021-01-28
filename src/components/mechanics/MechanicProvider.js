import React, { useState, createContext } from "react";

export const MechanicContext = createContext();

export const MechanicProvider = (props) => {
    const [mechanics, setMechanics] = useState([]);

    const getMechanics = () => {
        return fetch("http://localhost:8088/mechanics")
        .then(response => response.json())
        .then(setMechanics);
    };

    return (
        <MechanicContext.Provider value={{mechanics, getMechanics}}>
            {props.children}
        </MechanicContext.Provider>
    );
};