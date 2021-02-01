import React, {useContext} from "react";
import { SearchFilters } from "./SearchFilters.js";
import { SearchList } from "./SearchList.js";
import { GameContext } from "../boardGameAtlas/GameProvider.js";
import "./Search.css";

// Responsible for displaying the Search Filters & Search List components
export const SearchPage = () => {
    const {games, getGamesByFilters, saveUserGame} = useContext(GameContext);

    return (
        <>
            <SearchFilters getGamesByFilters={getGamesByFilters} />
            <SearchList games={games} saveUserGame ={saveUserGame} />
        </>
    );
};