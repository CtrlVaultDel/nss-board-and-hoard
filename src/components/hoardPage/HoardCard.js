import React from "react";
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
    
    const deleteButton = () => {
        const userGameObject = userGames.find(relation => relation.gameId === hoardGame.id);
        //console.log(userGames)
        //console.log(userGameObject);
        //return <button onClick = {deleteUserGame(userGameObject.id)}>Remove Game</button>
    };
    console.log()
    return (
        <section className="game">
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
            {/* Renders a button that allows the user to delete the game from their hoard page */}
            {/* {deleteButton()} */}
        </section>
)};