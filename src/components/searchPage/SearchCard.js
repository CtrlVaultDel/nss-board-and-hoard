import React from "react";
import "./Search.css";

export const SearchCard = ({searchGame, saveUserGame, userGames}) => {

    // Assigns specific className addition to game__averageRating based off of rating
    // This will be used in CSS later to dictate the color used for that section
    const checkRating = () => {
        const rating = Math.floor(searchGame.average_user_rating);
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

    // This determines whether the current game has already been saved to the
    // user's library (hoard). If it has been, the button to save the game to 
    // the user's hoard will be disabled.
    const isAlreadySaved = () => {
        if(userGames.some(userGame => userGame.gameId === searchGame.id)){
            return <button disabled>Hoard!</button>
        } else {
            return <button onClick={() => saveUserGame(searchGame)}>Hoard!</button>
        };
    };
    
    return (
        <section className="game">
            {/* Displays the game name */}
            <h3 className="game__name">
                {searchGame.name}
            </h3>
            {/* Displays the game image */}
            <div className="game__img">
                <img src={searchGame.images.small} alt={`Cover for ${searchGame.name}`} />
            </div>
            {/* Displays the game's average user rating */}
            <div className={`game__averageRating--${checkRating()}`}>
                Average User Rating: {searchGame.average_user_rating.toFixed(2)} / 5.00
            </div>
            {/* Displays the game's minimum and maximum players */}
            <div className="game__players">
                Players: {searchGame.min_players} - {searchGame.max_players}
            </div>
            {/* Renders a button that lets the user save the game to their library if they haven't already */}
            {isAlreadySaved()}
        </section>
)};