import React from "react";
import { Button } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import "./Hoard.css";

export const HoardCard = ({hoardGame, deleteUserGame, userGames}) => {

    // Assigns specific className addition to game__averageRating based off of rating
    // This will be used in CSS later to dictate the color used for that section
    const checkRating = () => {
        const rating = Math.floor(hoardGame.average_user_rating);
        switch(rating){
            case 4:
                return "great";
            case 3:
                return "good";
            case 2:
                return "ok";
            case 1:
                return "bad";
            case 0:
                return "unknown";
            default:
                return "unknown";
        };
    };

    // Creates delete button for each Hoard Game Card
    const deleteButton = () => {

        // Find the userGame Object (Local API) that relates to the current Hoard Game (from Board Game Atlas API)
        const userGameObject = userGames.find(relation => relation.gameId === hoardGame.id);

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
                <div className={`game__averageRating--${checkRating()}`}>
                    Average User Rating: {hoardGame.average_user_rating.toFixed(2)} / 5.00
                </div>
                {/* Displays the game's minimum and maximum players */}
                <div className="game__players">
                    Players: {hoardGame.min_players} - {hoardGame.max_players}
                </div>
            </CardContent>
            <CardActions>
                {/* Renders a button that allows the user to delete the game from their hoard page */}
                {deleteButton()}
            </CardActions>
            
        </Card>
)};