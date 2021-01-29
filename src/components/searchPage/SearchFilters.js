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

    useEffect(() => {
        getCategories()
        .then(getMechanics)
        .then(setIsLoading(false));
    },[]);

    const [isLoading, setIsLoading] = useState(true);
    const [search, setSearch] = useState({
        name: "",
        min_players: 1,
        categories: [],
        mechanics: []
    });

    const submitSearch = () => {
        // Filter parameters: name, min_players, categories, mechanics 
            const newSearch = { ...search}
            newSearch.name = "Catan"
            newSearch.min_players = "2"
            newSearch.categories = ["2bdFPJUvFo"]
            newSearch.mechanics = ["n1GtBt35Rd"]
            
            setSearch(newSearch)
            
        getGamesByFilters(search)
        .then(console.log(games))
      };

    return (
        <form className="SearchFilters">
            <h2 className="employeeForm__title">Search Filters</h2>
            <fieldset >
                <div className="nameContainer">
                    <label htmlFor="boardgameName">Boardgame Name: </label>
                    <input type="text" id="boardgameName" className="boardgameName" name="name" autoFocus defaultValue=""></input>
                </div>
            </fieldset>
            <fieldset>
                <div className="sliderContainer">
                    <label htmlFor="minPlayers">Min Players</label>
                    <input type="range" id="minPlayerSlider" className="minPlayerSlider" min="1" max="8"></input>
                </div>
            </fieldset>
            <fieldset>
                <div className="category">
                    <label htmlFor="category">Category 1: </label>
                    <select>
                        <option value="0">Select a category</option>
                        {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                    </select>
                </div>
            </fieldset>
            <fieldset>
                <div className="mechanic">
                    <label htmlFor="mechanic">Mechanic 1: </label>
                    <select>
                        <option value="0">Select a mechanic</option>
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