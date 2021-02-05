import React, { useContext } from "react";

// Material UI Imports
import { Button } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';

// Context
import { GameContext } from "../applicationProviders/GameProvider.js";

// Import Card Components and Functions
import { CardModal } from "../cardComponents/CardModal.js";
import { CardRating } from "../cardComponents/CardRating.js";
import { getMSRP, getRules } from "../cardComponents/CardFunctions.js";

import "./Hoard.css";

export const HoardCard = ({ hoardGame }) => {
    const { deleteUserGame, userGames } = useContext(GameContext);
    
    // store the current user's ID in a local variable
    const currentUser = parseInt(localStorage.getItem('board_and_hoard_user'));

    // Find the userGame Object (Local API) that relates to the current hoardGame (from Board Game Atlas API)
    const userGameObject = userGames.find(relation => relation.gameId === hoardGame.id && relation.userId === currentUser);

    // Creates delete button for each Hoard Game Card
    const deleteButton = () => {
        // Return a button which will send the related userGame Table ID to the deleteUserGame function
        return <Button variant="contained" color="primary" onClick = {() => deleteUserGame(userGameObject.id)}>Remove Game</Button>
    };

    return (
        <Card className="game">
            <CardContent>
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
                <div className="game__status">
                    {userGameObject.gameState.state}
                </div>
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