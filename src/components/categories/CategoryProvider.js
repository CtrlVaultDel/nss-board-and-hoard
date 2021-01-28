import React, { useState, createContext } from "react";

export const CategoryContext = createContext();

export const CategoryProvider = (props) => {
    const [categories, setCategories] = useState([]);

    const getCategories = () => {
        return fetch("http://localhost:8088/categories")
        .then(response => response.json())
        .then(setCategories);
    };

    return (
        <CategoryContext.Provider value={{categories, getCategories}}>
            {props.children}
        </CategoryContext.Provider>
    );
};