import React, {useContext, useEffect} from "react";
import { SearchFilters } from "./SearchFilters.js";
import { SearchList } from "./SearchList.js";
import { GameContext } from "../GameProvider.js";
import "./Search.css";

// Responsible for displaying the Search Filters & Search List components
export const SearchPage = () => {
    const {games, userGameIds, getGamesByFilters, saveUserGame} = useContext(GameContext);

    //useEffect(getUserGameIds,[])

    return (
        <>
            <SearchFilters getGamesByFilters={getGamesByFilters} />
            <SearchList games={games} saveUserGame={saveUserGame} userGameIds={userGameIds} />
        </>
    );
};