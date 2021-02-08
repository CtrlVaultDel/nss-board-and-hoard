// React
import React, { useContext, useState, useEffect, createContext } from "react";

// Context
import { CategoryContext } from "../applicationProviders/CategoryProvider.js"; 
import { MechanicContext } from "../applicationProviders/MechanicProvider.js"; 
import { GameContext } from "../applicationProviders/GameProvider.js";

// Styling
import "./Hoard.css";

// To export filteredHoardGames to HoardList
export const FilteredGameContext = createContext();

// Responsible for displaying the Hoard filter form and taking input(s) from the user
// Instead of hitting the external API, this alters the state of filteredHoardGames which
// is sent to HoardList. The original hoardGames array is left unaltered unless something is
// deleted in the Hoard List or saved from the SearchPage
export const HoardFilters = (props) => {
    // Pull context from these providers
    const { categories } = useContext(CategoryContext);
    const { mechanics } = useContext(MechanicContext);
    const { initializeHoardPage, hoardGames } = useContext(GameContext);

    // Local States
    const [filteredHoardGames, setFilteredHoardGames] = useState([]);
    const [availableCategories, setAvailableCategories] = useState([categories]);
    const [availableMechanics, setAvailableMechanics] = useState([mechanics]);

    // Determine available categories and mechanics based off available hoardGames 
    useEffect(()=> {
        // Go fetch userGames and hoardGames from their respective APIs when the page is rendered
        initializeHoardPage()

        // If there are hoard games, determine the relevant categories and mechanics to include in the filters
        if(hoardGames.length){
            // Apply hoardGames to filteredHoardGames by default
            setFilteredHoardGames([...hoardGames]);

            // Get a single array of all categories from the available hoard games
            // Remove duplicate IDs
            // Search through categories and pull out the related category object (ID & Name)
            const allCategoryIds = hoardGames.map(hg => hg.categories.map(c => c.id)).flat();
            const uniqueCategoryIds = [...new Set(allCategoryIds)];
            setAvailableCategories(categories.filter(c => uniqueCategoryIds.find(uci => uci === c.id)));

            // Get a single array of all mechanics from the available hoard games
            // Remove duplicate IDs
            // Search through mechanics and pull out the related category object (ID & Name)
            const allMechanicIds = hoardGames.map(hg => hg.mechanics.map(m => m.id)).flat();
            const uniqueMechanicIds = [...new Set(allMechanicIds)];
            setAvailableMechanics(mechanics.filter(m => uniqueMechanicIds.find(umi => umi === m.id)));
        } else {
            // Set categories and mechanics to default (both will have all options)
            setAvailableCategories(categories);
            setAvailableMechanics(mechanics);
        };
        //eslint-disable-next-line
    } ,[hoardGames]);

    // Related to the min_player slider
    const [rangeValue, setRangeValue] = useState(1);

    // Initialize the filter object to be used for the fetch call to Board Game Atlas
    const [filter, setFilter] = useState({
        name: "",
        players: 1,
        categories: "",
        mechanics: ""
    });

    // Updates the current filter object when a new input is made
    const handleChange = (event) => {
        // Create a copy of the state object
        const newFilter = { ...filter};

        // Set the related property and its value to newFilter object
        newFilter[event.target.name] = event.target.value;

        // Update state of filter
        setFilter(newFilter);
        // Updates the number beside the range slider
        if(event.target.name === 'players'){
            setRangeValue(event.target.value);
        };
    };

    // Filters the hoard games currently saved to the user's profile with the selected filters
    const filterHoardGames = () => {
        const newFilteredGames = hoardGames.filter(game => {
            let keep = true;
            // If the user entered a name, check if the game's name includes the filter
            if(filter.name !== ""){
                keep = keep && game.name.toLowerCase().includes(filter.name.toLowerCase());
            };
            // If the user entered a category, check if the game's categories includes the filter
            if(filter.categories !== ""){
                keep = keep && game.categories.some(c => 
                    c.id === filter.categories);
            };
            // If the user entered a mechanic, check if the game's mechanics includes the filter
            if(filter.mechanics !== ""){
                keep = keep && game.mechanics.some(c => 
                    c.id === filter.mechanics);
            };
            // Since there is always a player input, check that the filter is below the game's max players and above the game's min players
            keep = keep && game.min_players <= parseInt(filter.players) && game.max_players >= parseInt(filter.players);
            return keep;
        });
        console.log("newFilteredGames",newFilteredGames)
        setFilteredHoardGames(newFilteredGames)
    };
    
    // Hoard Filter Form
    return (
        <>
            <form className="HoardFilters" id="HoardFilters">
                <h2 className="employeeForm__title">Hoard Filters</h2>
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
                        <label htmlFor="minPlayers">Min Players: </label>
                        <input type="range" id="range-slider__range" name="players" onChange={handleChange} className="minPlayerSlider" min="1" max="8" defaultValue="1"></input>
                        <span className="range-slider__value">{rangeValue}</span>
                    </div>
                </fieldset>
                {/* Displays a dropdown of categories that the user can select to include in the filter */}
                <fieldset>
                    <div className="categories">
                        <label htmlFor="categories">Category: </label>
                        <select name="categories" onChange={handleChange}>
                            <option value="">All Categories</option>
                            {/* Only list categories relevant to the current hoardGames */}
                            {
                                availableCategories.map(({id, name}) => 
                                <option key={`${id}-category`} value={id}>
                                    {name}
                                </option>)
                            }
                        </select>
                    </div>
                </fieldset>
                {/* Displays a dropdown of mechanics that the user can select to include in the filter */}
                <fieldset>
                    <div className="mechanics">
                        <label htmlFor="mechanics">Mechanic: </label>
                        <select name="mechanics" onChange={handleChange}>
                            <option value="">All Mechanics</option>
                            {/* Only list mechanics relevant to the current hoardGames */}
                            {
                                availableMechanics.map(({id, name}) => 
                                <option key={`${id}-mechanic`} value={id}>
                                    {name}
                                </option>)
                            }
                        </select>
                    </div>
                </fieldset>
                <button className="btn btn-filter" onClick={event => {
                    event.preventDefault();
                    filterHoardGames();
                }}>
                    Filter Hoard
                </button>
                {/* Sets filteredHoardGames back to its default state (hoardGames) */}
                <button className="btn btn-clear" onClick={event => {
                    event.preventDefault();
                    document.getElementById("HoardFilters").reset();
                    setRangeValue(1);
                    setFilter({
                        name: "",
                        players: 1,
                        categories: "",
                        mechanics: ""
                    });
                    setFilteredHoardGames(hoardGames)
                }}>
                    Clear Filters
                </button>
            </form>

            <FilteredGameContext.Provider value={{filteredHoardGames}}>
                {props.children}
            </FilteredGameContext.Provider>
        </>
    );
};