import React from "react";

// Material UI Imports
import { Button } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';

// Import Details Modal
import { SearchModal } from "./SearchModal.js";

// Import Ratings Component
import { SearchRating } from "./SearchRating.js";

// Import CSS
import "./Search.css";

export const SearchCard = ({searchGame, saveUserGame, userGames}) => {

    // Breaks ratings into 0.5 segments and uses Material UI to display a number
    // of stars equal to the rating
    const displayRating = () => {
        const rating = (Math.round(searchGame.average_user_rating*2)/2);
        return <SearchRating rating={rating}/> 
    };

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

    const msrp = () => {
        if(searchGame.msrp_text === undefined){
            return "No price available"
        } else {
            return `MSRP: ${searchGame.msrp_text}`
        }
    }

    const rules = () => {
        if(searchGame.rules_url === null || searchGame.rules_url === undefined){
            return "No rules available"
        } else {
            return <a href={searchGame.rules_url} target="_blank">Rules</a>
        }
    }

    return (
        <Card raised="true" className="game">
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
                        Average User Rating: {displayRating()}
                    </div>
                    {/* Displays the game's minimum and maximum players */}
                    <div className="game__players">
                        Players: {searchGame.min_players} - {searchGame.max_players}
                    </div>
                    <div className="game__msrp">
                        {msrp()}
                    </div>
                    <div className="game__rules">
                        {rules()}
                    </div>
                </CardContent>
            <Grid container justify="center">
                <CardActions style={{}}>
                    <SearchModal searchGame={searchGame}/>

                    {/* Renders a button that lets the user save the game to their library if they haven't already */}
                    {saveButton()}
                </CardActions>
            </Grid>
        </Card>
    );
};

