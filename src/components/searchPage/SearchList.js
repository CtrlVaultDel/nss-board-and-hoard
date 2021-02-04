import React from "react";
import { SearchCard } from "./SearchCard.js";
import "./Search.css";

// Takes the array of searchGames passed in and sends each individual game to SearchCard
// so each is rendered as its own card on the DOM in the Search List below the Search Filters
export const SearchList = ({searchGames, saveUserGame, userGames}) => {
    return (
        <div className="searchList_games">
        {
            searchGames.map(searchGame => <SearchCard 
                key={searchGame.id} 
                searchGame={searchGame} 
                saveUserGame={saveUserGame} 
                userGames={userGames} 
            />)
        }
        </div>
    );
};