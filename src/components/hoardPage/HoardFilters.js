// React
import React, { useContext, useState, useEffect, createContext } from "react";

// Material UI
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
// Context
import { CategoryContext } from "../applicationProviders/CategoryProvider.js"; 
import { MechanicContext } from "../applicationProviders/MechanicProvider.js"; 
import { GameContext } from "../applicationProviders/GameProvider.js";

// Styling
import "./Hoard.css";

// Material UI Style Functions

// Name input -- used to style name input
const useTextStyles = makeStyles((theme) => ({
    root: {
      '& > *': {
        margin: theme.spacing(1),
      },
    },
}));

// Slider -- used to style the slider
const useSliderStyles = makeStyles({
    root: {
        width: 250,
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

// Submit -- used to style filter button
const useButtonStyles = makeStyles((theme) => ({
    root: {
      '& > *': {
        margin: theme.spacing(1),
      },
    },
}));


// To export filteredHoardGames to HoardList
export const FilteredGameContext = createContext();

// Responsible for displaying the Hoard filter form and taking input(s) from the user
// Instead of hitting the external API, this alters the state of filteredHoardGames which
// is sent to HoardList. The original hoardGames array is left unaltered unless something is
// deleted in the Hoard List or saved from the SearchPage
export const HoardFilters = (props) => {

      // MUI Text Input
      const textClasses = useTextStyles();

      // MUI Slider Input
      const sliderClasses = useSliderStyles();
  
      // MUI Select Input
      const selectClasses = useSelectStyles();
  
      // MUI Button
      const buttonClasses = useButtonStyles();
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

    // Initialize the filter object to be used for the fetch call to Board Game Atlas
    const [filter, setFilter] = useState({
        name: "",
        players: 1,
        categories: "",
        mechanics: ""
    });

    // Updates the current filter object when a new input is made
    const handleChange = (event, newValue) => {

        // Create a copy of the filter object
        const newFilter = { ...filter };

        // Update specific item
        newFilter[event]=newValue

        // Set the fiter to the newFilter
        setFilter(newFilter)
    };

    // Handles the name state for the form
    const [nameValue, setNameValue] = useState("");

    const handleNameChange = (event) => {
        setNameValue(event.target.value);
        handleChange("name", event.target.value)
    }

    // Handles the slider state for the form
    const [sliderValue, setSliderValue] = useState(1);

    const handleSliderChange = (e, newValue) => {
        setSliderValue(newValue);
        handleChange("players", newValue);
    };

    // Handles the category state for the form
    const [categoryValue, setCategoryValue] = useState("");

    const handleCategoryChange = (event) => {
        setCategoryValue(event.target.value);
        handleChange("categories", event.target.value);
    };


    // Handles the mechanic state for the form
    const [mechanicValue, setMechanicValue] = useState("");

    const handleMechanicChange = (event) => {
        setMechanicValue(event.target.value);
        handleChange("mechanics", event.target.value);
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
        setFilteredHoardGames(newFilteredGames)
        console.log("searching with the filters:", filter)
    };
    
    // Hoard Filter Form
    return (
        <>
            <form className={textClasses.root} id="HoardFilters">
                <h2 className="hoardFilter--title">Hoard Filters</h2>
                {/* Displays a text input field for the user to fill out for the name of the boardgame(s) they are looking for */}
                <fieldset >
                    <div className="nameContainer">
                        <TextField 
                            id="boardGameName" 
                            className="boardgameName" 
                            variant="outlined" 
                            label="Boardgame Name" 
                            name="name" autoComplete="off" 
                            onChange={handleNameChange} 
                            value={nameValue}
                            autoFocus 
                        />
                    </div>
                </fieldset>

                {/* Displays a range slider that the user can use to indicate the mininum players */}
                <fieldset className={sliderClasses.root}>
                    <Typography 
                        id="discrete-slider" 
                        gutterBottom
                    >
                        Minimum Players
                    </Typography>
                    <Slider
                        value={sliderValue}
                        getAriaValueText={valueText}
                        aria-labelledby="gt_min-players"
                        valueLabelDisplay="auto"
                        step={1}
                        marks={marks}
                        min={1}
                        max={8}
                        onChange={handleSliderChange}
                    />
                </fieldset>

            {/* Categories & Mechanics Dropdown */}
            <Grid 
                container
                direction="row"
                justify="center"
                alignItems="baseline"
            >
                {/* Displays a dropdown of categories that the user can select to include in the filter */}
                <fieldset 
                    className="categories">
                    <FormControl 
                        className={selectClasses.formControl}>
                        <InputLabel 
                            id="categories"> Category: 
                        </InputLabel>
                        <Select 
                            labelId="categoriesLabel"
                            id="categories-select"
                            name="categories" 
                            value={categoryValue}
                            onChange={handleCategoryChange}>
                            <MenuItem 
                                value=""> All Categories
                            </MenuItem>
                            {
                                availableCategories.map(c => 
                                    <MenuItem 
                                        key={`${c.id}-hoard`} 
                                        value={c.id}
                                    >
                                        {c.name}
                                    </MenuItem>)
                            }
                        </Select>
                    </FormControl>
                </fieldset>

                {/* Displays a dropdown of mechanics that the user can select to include in the filter */}
                <fieldset className="mechanics">
                    <FormControl className={selectClasses.formControl}>
                        <InputLabel 
                            id="mechanics"> 
                            Mechanic: 
                        </InputLabel>
                        <Select 
                            labelId="mechanicsLabel"
                            id="mechanics-select"
                            name="mechanics" 
                            value={mechanicValue}
                            onChange={handleMechanicChange}>
                            <MenuItem 
                                value=""> 
                                All Mechanics
                            </MenuItem>
                            {
                                availableMechanics.map(m => 
                                    <MenuItem 
                                        key={`${m.id}-hoard`} 
                                        value={m.id}>
                                        {m.name}
                                    </MenuItem>)
                            }
                        </Select>
                    </FormControl>
                </fieldset>
            </Grid>
                <div className={buttonClasses.root}>
                    <Button 
                        className="btn btn-filter" 
                        variant="contained" 
                        color="default"  
                        onClick={event => {
                        event.preventDefault();
                        filterHoardGames();
                    }}>
                        Filter Hoard
                    </Button>
                    {/* Sets filteredHoardGames back to its default state (hoardGames) */}
                    <Button 
                        className="btn btn-clear" 
                        variant="contained" 
                        color="default" 
                        onClick={event => {
                        event.preventDefault();
                        
                        // Set form values back to default
                        setNameValue("");
                        setSliderValue(1);
                        setCategoryValue("");
                        setMechanicValue("");

                        // Set filter back to default
                        setFilter({
                            name: "",
                            players: 1,
                            categories: "",
                            mechanics: ""
                        });

                        // Set filteredHoardGames back to default (= hoardGames)
                        setFilteredHoardGames(hoardGames);
                    }}>
                        Clear Filters
                    </Button>
                </div>
            </form>

            <FilteredGameContext.Provider value={{filteredHoardGames}}>
                {props.children}
            </FilteredGameContext.Provider>
        </>
    );
};