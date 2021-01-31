import React from "react";
import { SearchCard } from "./SearchCard.js";
import "./Search.css";

export const SearchList = ({games}) => {
    if(Array.isArray(games)){
        console.log(games)
        return (
            <>
                <h1 className="searchList_header">Search List</h1>
                <div className="searchList_games">
                    {
                        games.map(game => <SearchCard key={game.id} gameObject={game}/>)
                    }
                </div>
            </>
        );
    } else {
        console.log("something didnt work")
        return (
            <>
                <h1 className="searchList_header">Search List</h1>
                <div className="searchList_games">No games found with given filters</div>
            </>
        )
    }
};