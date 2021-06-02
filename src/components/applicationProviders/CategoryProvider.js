// React
import React, { useState, createContext, useEffect } from "react";

/* ===================================================== */

export const CategoryContext = createContext();

// Responsible for getting, converting and providing game categories from an external API
export const CategoryProvider = (props) => {
    const [categories, setCategories] = useState([]);

    // Gets categories from external API
    const loadCategories = () => {
        return fetch("https://www.boardgameatlas.com/api/game/categories?pretty=true&client_id=JLBr5npPhV")
        .then(response => response.json())
        .then(data => data.categories);
    };

    // Combines the loading and setting of categories
    const getCategories = () => {
        loadCategories()
        .then(setCategories);
    };

    //eslint-disable-next-line
    useEffect(() => getCategories(), []);

    return (
        <CategoryContext.Provider value={{categories}}>
            {props.children}
        </CategoryContext.Provider>
    );
};