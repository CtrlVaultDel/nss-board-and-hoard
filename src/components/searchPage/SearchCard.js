import React from "react";

// Material UI Imports
import { Button } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';

// Import Card Components and Functions
import { CardModal } from "../cardComponents/CardModal.js";
import { CardRating } from "../cardComponents/CardRating.js";
import { getMSRP, getRules } from "../cardComponents/CardFunctions.js";

import "./Search.css";

export const SearchCard = ({searchGame, saveUserGame, userGames}) => {

    // This determines whether the current game has already been saved to the
    // user's library (hoard). If it has been, the button to save the game to 
    // the user's hoard will be disabled.
    const saveButton = () => {
        if(userGames.some(userGame => userGame.gameId === searchGame.id)){
            return <Button disabled>Already in Hoard</Button>
        } else {
            return <Button variant="contained" color="primary" onClick={() => saveUserGame(searchGame)}>Hoard!</Button>
        };
    };

    return (
        <Card className="game">
                <CardContent>
                    {/* Displays the game name */}
                    <h3 className="game__name">
                        {searchGame.name}
                    </h3>
                    {/* Displays the game image */}
                    <div className="game__img">
                        <img src={searchGame.images.small} alt={`Cover for ${searchGame.name}`} />
                    </div>
                    {/* Displays the game's average user rating */}
                    <div className={`game__averageRating`}>
                        Average User Rating: <CardRating rating={searchGame.average_user_rating}/>
                    </div>
                    {/* Displays the game's minimum and maximum players */}
                    <div className="game__players">
                        Players: {searchGame.min_players} - {searchGame.max_players}
                    </div>
                    <div className="game__msrp">
                        {getMSRP(searchGame.msrp_text)}
                    </div>
                    <div className="game__rules">
                        {getRules(searchGame.rules_url)}
                    </div>
                </CardContent>
            <Grid container justify="center">
                <CardActions style={{}}>
                    <CardModal game={searchGame}/>

                    {/* Renders a button that lets the user save the game to their library if they haven't already */}
                    {saveButton()}
                </CardActions>
            </Grid>
        </Card>
    );
};

