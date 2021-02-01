import React from "react";
import "./Search.css";

export const SearchCard = ({game, saveUserGame}) => {
    const checkRating = () => {
        const rating = Math.floor(game.average_user_rating);
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
    
    return (
        <section className="game">
            {/* Displays the game name */}
            <h3 className="game__name">
                {game.name}
            </h3>
            {/* Displays the game image */}
            <div className="game__img">
                <img src={game.images.small} alt={`Cover for ${game.name}`} />
            </div>
            {/* Displays the game's average user rating */}
            <div className={`game__averageRating--${checkRating()}`}>
                Average User Rating: {game.average_user_rating.toFixed(2)} / 5.00
            </div>
            <div className="game__players">
                Players: {game.min_players} - {game.max_players}
            </div>
            <button onClick={() => saveUserGame(game)}>
                Hoard!
            </button>
        </section>
)};