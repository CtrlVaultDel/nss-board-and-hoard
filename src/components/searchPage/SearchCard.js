// React
import React, {useContext} from "react";

// Material UI
import { Button } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';

// Components and Function
import { CardModal } from "../cardComponents/CardModal.js";
import { CardRating } from "../cardComponents/CardRating.js";
import { getMSRP, getRules } from "../cardComponents/CardFunctions.js";

// Context
import { GameContext } from "../applicationProviders/GameProvider.js";

// Styling
import "./Search.css";

export const SearchCard = ({searchGame, userGames}) => {
    // Gets state context for userGames from GameProvider.js
    const {saveUserGame} = useContext(GameContext);

    // Renders a save button which allows the user to save the selected game in
    // the userGames Table. If the has already been saved, the button will be disabled
    const saveButton = () => {
        if(userGames.some(userGame => userGame.gameId === searchGame.id)){
            //console.log("showing current searchGame", searchGame, "showing current userGame", userGames)
            return <Button disabled>Already in Hoard</Button>
        } else {
            return <Button variant="contained" color="primary" onClick={() => saveUserGame(searchGame)}>Hoard!</Button>
        };
    };

    // Renders a card on the page that represents a game and its related information
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
                {/* Displays the game's manufacturer suggested retail price (if the external API gave one)*/}
                <div className="game__msrp">
                    {getMSRP(searchGame.msrp_text)}
                </div>
                {/* Displays a link to the game's rules (if such a link exists from the external API) */}
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