import React, {useContext} from "react";
import { SearchFilters } from "./SearchFilters.js";
import { SearchList } from "./SearchList.js";
import { GameContext } from "../applicationProviders/GameProvider.js";
import "./Search.css";

// Responsible for displaying the Search Filters & Search List components
export const SearchPage = () => {
    const {searchGames, userGames, saveUserGame} = useContext(GameContext);

    return (
        <>
            <SearchFilters />
            <SearchList 
                searchGames={searchGames} 
                saveUserGame={saveUserGame} 
                userGames={userGames} 
            />
        </>
    );
};