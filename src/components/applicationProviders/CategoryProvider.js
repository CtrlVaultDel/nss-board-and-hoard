import React, { useState, createContext, useEffect } from "react";

export const CategoryContext = createContext();

// Responsible for getting, converting and providing game categories from an external API
export const CategoryProvider = (props) => {
     // Initialize the categories state
     useEffect(() => getCategories(),
    //eslint-disable-next-line
    []);

    // Loads response from external API for categories
    // Converts the response to a JS Object 
    // Returns resulting data
    const loadCategories = () => {
        return fetch("https://www.boardgameatlas.com/api/game/categories?pretty=true&client_id=JLBr5npPhV")
        .then(response => response.json())
        .then(data => data.categories);
    };

    // Used to store and update state of categories
    const [categories, setCategories] = useState([]);

    // Combines the loading and setting of categories
    const getCategories = () => {
        loadCategories()
        .then(setCategories);
    };

    return (
        <CategoryContext.Provider value={{categories}}>
            {props.children}
        </CategoryContext.Provider>
    );
};