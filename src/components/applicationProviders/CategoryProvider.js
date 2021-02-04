import React, { useState, createContext, useEffect } from "react";

export const CategoryContext = createContext();

export const CategoryProvider = (props) => {
    const [categories, setCategories] = useState([]);

     // Initialize the categories state
     useEffect(() => getCategories(),
    //eslint-disable-next-line
    []);

    const getCategories = () => {
        return fetch("https://www.boardgameatlas.com/api/game/categories?pretty=true&client_id=JLBr5npPhV")
        .then(response => response.json())
        .then((data) => setCategories(data.categories));
    };

    return (
        <CategoryContext.Provider value={{categories}}>
            {props.children}
        </CategoryContext.Provider>
    );
};