import React from "react";
import { SearchCard } from "./SearchCard.js";
import "./Search.css";

// Takes the array of games passed in and sends each individual game to SearchCard
// so each is rendered as its own card on the DOM in the Search List below the Search Filters
export const SearchList = ({games, saveUserGame}) => {
    return (
        <div className="searchList_games">
        {
            games.map(game => <SearchCard key={game.id} game={game} saveUserGame={saveUserGame} />)
        }
        </div>
    );
};