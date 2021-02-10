import React, { useContext, useState } from "react";

// Material UI Imports
import { makeStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

// Context
import { GameContext } from "../applicationProviders/GameProvider.js";
import { GameStateContext } from "../applicationProviders/GameStateProvider.js";

// Import Card Components and Functions
import { CardModal } from "../cardComponents/CardModal.js";
import { CardRating } from "../cardComponents/CardRating.js";
import { getMSRP, getRules } from "../cardComponents/CardFunctions.js";

// Styles
import "./Hoard.css";

// Select -- used to style the select dropdowns
const useSelectStyles = makeStyles((theme) => ({
    formControl: {
      minWidth: 150,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
}));

// Takes individual search game from HoardList and renders it to the DOM as a card with its relevant information 
export const HoardCard = ({ hoardGame, userGame }) => {
    // MUI Select Input
    const selectClasses = useSelectStyles();

    const { deleteUserGame, updateGameState } = useContext(GameContext);
    const { gameStates } = useContext(GameStateContext)

    // Handles the category state for the form
    const [gameStateValue, setGameStateValue] = useState(() => userGame.gameStateId);

    const handleGameStateChange = (event) => {
        setGameStateValue(event.target.value);
        updateGameState(userGame.id, userGame.gameId, userGame.userId, event.target.value);
    };

    // Creates delete button for each Hoard Game Card
    const deleteButton = () => {
        // Return a button which will send the related userGame Table ID to the deleteUserGame function
        return <Button variant="contained" color="secondary" onClick = {() => deleteUserGame(userGame.id, hoardGame.id)}>Remove</Button>
    };
    return (
        <Card className="game">
            <CardContent>
                <Grid container align="center" justify="center" direction="column">
                {/* Displays the game name */}
                <h3 className="game__name">
                    {hoardGame.name}
                </h3>
                {/* Displays the game image */}
                
                    <div className="game__img">
                        <img src={hoardGame.images.small} alt={`Cover for ${hoardGame.name}`} />
                    </div>
                    {/* Displays the game's average user rating */}
                    <div className={`game__averageRating`}>
                        Average User Rating: <CardRating rating={hoardGame.average_user_rating}/>
                    </div>
                    {/* Displays the game's minimum and maximum players */}
                    <div className="game__players">
                        Players: {hoardGame.min_players} - {hoardGame.max_players}
                    </div>
                    <div className="game__msrp">
                        {getMSRP(hoardGame.msrp_text)}
                    </div>
                    <div className="game__rules">
                        {getRules(hoardGame.rules_url)}
                    </div>
                    <form>
                        <FormControl
                            className={selectClasses.formControl}>
                            <Select 
                                name="current--gameStatus"
                                className="game__status"
                                value={gameStateValue}
                                onChange={handleGameStateChange}>
                                {
                                    gameStates.map(gs => 
                                        <MenuItem 
                                            key={gs.id} 
                                            value={gs.id}>
                                            {gs.state}
                                        </MenuItem>)
                                }
                            </Select>
                        </FormControl>
                    </form>
                </Grid>
            </CardContent>
            <Grid container justify="center">
                <CardActions>
                    <CardModal game={hoardGame}/>
                    {/* Renders a button that allows the user to delete the game from their hoard page */}
                    {deleteButton()}
                </CardActions>
            </Grid>
        </Card>
)};