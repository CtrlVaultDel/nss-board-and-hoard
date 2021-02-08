// React
import React, { useContext, useState } from "react";

// Material UI
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

// Context
import { CategoryContext } from "../applicationProviders/CategoryProvider.js"; 
import { MechanicContext } from "../applicationProviders/MechanicProvider.js"; 
import { GameContext } from "../applicationProviders/GameProvider.js";

// Styling
import "./Search.css";

// Material UI Style Functions

// Name input -- used to style name input
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

// Select -- used to style the select dropdowns
const useSelectStyles = makeStyles((theme) => ({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  }));

// Responsible for displaying the form and taking input(s) from the user
// in order to send a fetch call with the desired filters.
export const SearchFilters = () => {

    // MUI Text Input
    const textClasses = useTextStyles();

    // MUI Slider Input
    const sliderClasses = useSliderStyles();

    // MUI Select Input
    const selectClasses = useSelectStyles();

    // Pull context from these providers
    const { categories } = useContext(CategoryContext);
    const { mechanics } = useContext(MechanicContext);
    const { getSearchGames } = useContext(GameContext);

    // Initialize the search object to be used for the fetch call to Board Game Atlas
    const [search, setSearch] = useState({
        name: "",
        gt_min_players: 1,
        categories: "",
        mechanics: ""
    });

    // Updates the current search object when a new input is made
    const handleChange = (event, newValue) => {

        // Create a copy of the search object
        const newSearch = { ...search };

        if(newValue >= 1 && newValue <= 8){
            newSearch["gt_min_players"] = newValue;
            setSearch(newSearch);
            console.log("Setting Range", newValue)
        } else if(event === "category") {
            newSearch["categories"] = newValue;
            setSearch(newSearch);
            console.log("Setting Category", newValue)
        } else {
            console.log("Setting other things")
            // Set the related property and its value to newSearch object
            newSearch[event.target.name] = event.target.value;

            // Update state of search
            setSearch(newSearch);
        }   
    };

    // Handles the category state
    const [category, setCategory] = useState("")

    const handleCategoryChange = (event) => {
        setCategory(event.target.value)
        handleChange("category", event.target.value)
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
                </div>
            </fieldset>
            {/* Displays a dropdown of categories that the user can select to include in the filter */}
            <fieldset>
                <div className="categories">
                    <FormControl className={selectClasses.formControl}>
                        <InputLabel 
                            id="categories"> Category: 
                        </InputLabel>
                        <Select 
                            labelId="categoriesLabel"
                            id="categories-select"
                            name="categories" 
                            value={category}
                            onChange={handleCategoryChange}>
                            <MenuItem 
                                value=""> All Categories
                            </MenuItem>
                            {
                                categories.map(c => 
                                    <MenuItem key={c.id} value={c.id}>
                                        {c.name}
                                    </MenuItem>)
                            }
                        </Select>
                    </FormControl>
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