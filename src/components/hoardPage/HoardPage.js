import React, {useContext} from "react";
import { HoardFilters } from "./HoardFilters.js";
import { HoardList } from "./HoardList.js";
import { GameContext } from "../GameProvider.js";
import "./Hoard.css";

// Responsible for displaying the Search Filters & Search List components
export const HoardPage = () => {
    const {hoardGames, getGamesById, userGames, getUserGames, deleteUserGame} = useContext(GameContext);

    return (
        <>
            <HoardFilters />
            <HoardList getUserGames={getUserGames} getGamesById={getGamesById} hoardGames={hoardGames} deleteUserGame={deleteUserGame} userGames={userGames} />
        </>
    );
};