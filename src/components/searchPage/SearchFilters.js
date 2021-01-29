import React, { useContext, useEffect, useState } from "react";
import "./SearchFilters.css";

// import providers
import { GameContext } from "../boardGameAtlas/GameProvider.js";
import { CategoryContext } from "../categories/CategoryProvider.js"; 
import { MechanicContext } from "../mechanics/MechanicProvider.js"; 

export const SearchFilters = () => {
    const { categories, getCategories } = useContext(CategoryContext);
    const { mechanics, getMechanics } = useContext(MechanicContext);
    const { games, getGamesByFilters } = useContext(GameContext);

    const [isLoading, setIsLoading] = useState(true);

    const [search, setSearch] = useState({
        name: "",
        min_players: 1,
        category: "",
        mechanic: ""
    });

    const handleChange = (event) => {
        // Create a copy of the state object
        const newSearch = { ...search}

        // Set the related property and its value to newSearch object
        newSearch[event.target.name] = event.target.value;

        // Update state of search
        setSearch(newSearch);
    }

    const submitSearch = () => {
        console.log(search)
        // Request game data from Board Game Atlas with the new search criteria
        //getGamesByFilters(search)
        //.then(console.log(games))
      };

      useEffect(() => {
        getCategories()
        .then(getMechanics)
        .then(setIsLoading(false));
    },[]);

    return (
        <form className="SearchFilters">
            <h2 className="employeeForm__title">Search Filters</h2>
            <fieldset >
                <div className="nameContainer">
                    <label htmlFor="boardgameName">Boardgame Name: </label>
                    <input type="text" id="boardgameName" className="boardgameName" name="name" onChange={handleChange} autoFocus defaultValue=""></input>
                </div>
            </fieldset>
            <fieldset>
                <div className="sliderContainer">
                    <label htmlFor="minPlayers">Min Players</label>
                    <input type="range" id="minPlayerSlider" name="min_players" onChange={handleChange} className="minPlayerSlider" min="1" max="8"></input>
                </div>
            </fieldset>
            <fieldset>
                <div className="category">
                    <label htmlFor="category">Category: </label>
                    <select name="category" onChange={handleChange}>
                        <option value="">All Categories</option>
                        {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                    </select>
                </div>
            </fieldset>
            <fieldset>
                <div className="mechanic">
                    <label htmlFor="mechanic">Mechanic: </label>
                    <select name="mechanic" onChange={handleChange}>
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