import React, { useState, createContext } from "react";

export const CategoryContext = createContext();

export const CategoryProvider = (props) => {
    const [categories, setCategories] = useState([]);

    const getCategories = () => {
        return fetch("https://www.boardgameatlas.com/api/game/categories?pretty=true&client_id=JLBr5npPhV")
        .then(response => response.json())
        .then((data) => setCategories(data.categories));
    };

    return (
        <CategoryContext.Provider value={{categories, getCategories}}>
            {props.children}
        </CategoryContext.Provider>
    );
};