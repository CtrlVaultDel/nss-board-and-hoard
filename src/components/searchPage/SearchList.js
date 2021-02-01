import React from "react";
import { SearchCard } from "./SearchCard.js";
import "./Search.css";

// Takes the array of games passed in and sends each individual game to SearchCard
// so each is rendered as its own card on the DOM in the Search List below the Search Filters
export const SearchList = (gamesArray) => {

    return (
        <>
            <h1 className="searchList_header">Search List</h1>
            <div className="searchList_games">
            {/* {
                gamesArray.map(game => <SearchCard key={game.id} game={game} />)
            } */}
            </div>
        </>
    );
};