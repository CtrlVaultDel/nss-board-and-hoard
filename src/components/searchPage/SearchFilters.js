import React, { useContext, useEffect, useState } from "react";
import { SearchList } from "./SearchList.js";
import "./Search.css";

// import providers
import { GameContext } from "../boardGameAtlas/GameProvider.js";
import { CategoryContext } from "../categories/CategoryProvider.js"; 
import { MechanicContext } from "../mechanics/MechanicProvider.js"; 

export const SearchFilters = () => {
    // Pull context from these providers
    const { categories, getCategories } = useContext(CategoryContext);
    const { mechanics, getMechanics } = useContext(MechanicContext);
    const { games, getGamesByFilters } = useContext(GameContext);
    
    const [rangeValue, setRangeValue] = useState(1);
    const [isLoading, setIsLoading] = useState(true);

    // Initialize the search object to be used for the fetch call to Board Game Atlas
    const [search, setSearch] = useState({
        name: "",
        min_players: 1,
        categories: "",
        mechanics: ""
    });

    // Updates the current search object when a new input is made
    const handleChange = (event) => {
        // Create a copy of the state object
        const newSearch = { ...search};

        // Set the related property and its value to newSearch object
        newSearch[event.target.name] = event.target.value;

        // Update state of search
        setSearch(newSearch);

        // Updates the number beside the range slider
        if(event.target.name === 'min_players'){
            setRangeValue(event.target.value);
        };
    };

    // Handles making the fetch call to Board Game Atlas API with the search object as the filter
    // After receiving the reponse, sends the returned games to SearchList to be rendered on the DOM.
    // Then, the entire form is reset back to its default state
    const submitSearch = () => {
        getGamesByFilters(search)
        .then(() => {
            console.log("searched with: ",search)
            console.log(games)
            //SearchList(games);
            setRangeValue(1)
            document.getElementById('SearchFilters').reset()
        });
      };

      useEffect(() => {
        getCategories()
        .then(getMechanics)
        .then(setIsLoading(false));
    },
    //eslint-disable-next-line
    []);

    return (
        <form className="SearchFilters" id="SearchFilters">
            <h2 className="employeeForm__title">Search Filters</h2>
            {/* Displays a text input field for the user to fill out for the name of the boardgame(s) they are looking for */}
            <fieldset >
                <div className="nameContainer">
                    <label htmlFor="boardgameName">Boardgame Name: </label>
                    <input type="text" id="boardgameName" className="boardgameName" name="name" autoComplete="off" onChange={handleChange} autoFocus defaultValue=""></input>
                </div>
            </fieldset>
            {/* Displays a range slider that the user can use to indicate the mininum players */}
            <fieldset>
                <div className="range-slider">
                    <label htmlFor="minPlayers">Min Players</label>
                    <input type="range" id="range-slider__range" name="min_players" onChange={handleChange} className="minPlayerSlider" min="1" max="8" defaultValue="1"></input>
                    <span className="range-slider__value">{rangeValue}</span>
                </div>
            </fieldset>
            {/* Displays a dropdown of categories that the user can select to include in the filter */}
            <fieldset>
                <div className="categories">
                    <label htmlFor="categories">Category: </label>
                    <select name="categories" onChange={handleChange}>
                        <option value="">All Categories</option>
                        {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                    </select>
                </div>
            </fieldset>
            {/* Displays a dropdown of mechanics that the user can select to include in the filter */}
            <fieldset>
                <div className="mechanics">
                    <label htmlFor="mechanics">Mechanic: </label>
                    <select name="mechanics" onChange={handleChange}>
                        <option value="">All Mechanics</option>
                        {mechanics.map(m => <option key={m.id} value={m.id}>{m.name}</option>)}
                    </select>
                </div>
            </fieldset>
            <button className="btn btn-primary" disabled={isLoading} onClick={event => {
                event.preventDefault(); // Prevent browser from submitting the form and refreshing the page
                submitSearch();
            }}>Search!
            </button>
        </form>
    );
};