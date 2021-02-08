// React
import React, { useContext, useState } from "react";

// Material UI
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';

// Context
import { CategoryContext } from "../applicationProviders/CategoryProvider.js"; 
import { MechanicContext } from "../applicationProviders/MechanicProvider.js"; 
import { GameContext } from "../applicationProviders/GameProvider.js";

// Styling
import "./Search.css";

// Material UI Style Functions

// Text Input
const useTextStyles = makeStyles((theme) => ({
    root: {
      '& > *': {
        margin: theme.spacing(1),
        width: '25ch',
      },
    },
}));

// Slider -- used to style the slider
const useSliderStyles = makeStyles({
    root: {
        width: 300,
    },
});

// Slider -- used to place a value in the bubble above the current selection
const valueText = value => `${value}`;

// Slider -- used to make custom marks under the slider
const marks = [
    {
        value: 1,
        label: "1"
    },
    {
        value: 8,
        label: "8"
    }
]

// Responsible for displaying the form and taking input(s) from the user
// in order to send a fetch call with the desired filters.
export const SearchFilters = () => {

    // MUI Text Input
    const textClasses = useTextStyles();

    // MUI Slider Input
    const sliderClasses = useSliderStyles();

    // Pull context from these providers
    const { categories } = useContext(CategoryContext);
    const { mechanics } = useContext(MechanicContext);
    const { getSearchGames } = useContext(GameContext);

    // Related to the min_player slider
    const [rangeValue, setRangeValue] = useState(1);

    // Initialize the search object to be used for the fetch call to Board Game Atlas
    const [search, setSearch] = useState({
        name: "",
        gt_min_players: 1,
        categories: "",
        mechanics: ""
    });

    // Updates the current search object when a new input is made
    const handleChange = (event, newValue) => {

        // Create a copy of the state object
        const newSearch = { ...search };

        if(newValue){
            newSearch["gt_min_players"] = newValue;
            setSearch(newSearch);
        } else {
            // Set the related property and its value to newSearch object
            newSearch[event.target.name] = event.target.value;

            // Update state of search
            setSearch(newSearch);
        }   
    };

    // Search Filter Form
    return (
        <form className={textClasses.root} className="SearchFilters" id="SearchFilters">
            <h2 className="employeeForm__title">Search Filters</h2>
            {/* Displays a text input field for the user to fill out for the name of the boardgame(s) they are looking for */}
            <fieldset >
                <div className="nameContainer">
                    <TextField id="boardGameName" className="boardgameName" variant="outlined" label="Boardgame Name" name="name" autoComplete="off" onChange={handleChange} autoFocus defaultValue=""></TextField>
                </div>
            </fieldset>
            {/* Displays a range slider that the user can use to indicate the mininum players */}
            <fieldset>
                <div className={sliderClasses.root}>
                    <Typography id="discrete-slider" gutterBottom>
                        Minimum Players
                    </Typography>
                    <Slider
                        defaultValue={1}
                        getAriaValueText={valueText}
                        aria-labelledby="gt_min-players"
                        valueLabelDisplay="auto"
                        step={1}
                        marks={marks}
                        min={1}
                        max={8}
                        onChangeCommitted={handleChange}
                    />
                    {/* <label htmlFor="minPlayers">Min Players: </label>
                    <input type="range" id="range-slider__range" name="gt_min_players" onChange={handleChange} className="minPlayerSlider" min="1" max="8" defaultValue="1"></input>
                    <span className="range-slider__value">{rangeValue}</span> */}
                </div>
            </fieldset>
            {/* Displays a dropdown of categories that the user can select to include in the filter */}
            <fieldset>
                <div className="categories">
                    <label htmlFor="categories">Category: </label>
                    <select name="categories" onChange={handleChange}>
                        <option value="">All Categories</option>
                        {
                            categories.map(c => 
                                <option key={c.id} value={c.id}>
                                    {c.name}
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
                        {
                            mechanics.map(m => 
                                <option key={m.id} value={m.id}>
                                    {m.name}
                                </option>)
                        }
                    </select>
                </div>
            </fieldset>
            <button className="btn btn-search" onClick={event => {
                event.preventDefault();
                getSearchGames(search);
                console.log("Searching for", search)
            }}>Search!
            </button>
        </form>
    );
};