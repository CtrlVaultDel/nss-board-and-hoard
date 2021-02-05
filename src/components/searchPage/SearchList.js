// React
import React, {useContext} from "react";

// Component
import { SearchCard } from "./SearchCard.js";

// Context
import { GameContext } from "../applicationProviders/GameProvider.js";

//Styling
import "./Search.css";

// Takes the array of searchGames passed in and sends each individual game to SearchCard
// so each is rendered as its own card on the DOM in the Search List below the Search Filters
export const SearchList = () => {
    const {searchGames} = useContext(GameContext);

    // Only use search results that have images
    const gamesWithImages = searchGames.filter(sg => !sg.images.small.includes(null, "empty"))
    console.log(gamesWithImages)
    return (
        <div className="searchList_games">
        {
            gamesWithImages.map(searchGame => <SearchCard 
                key={searchGame.id} 
                searchGame={searchGame} 
            />)
        }
        </div>
    );
};