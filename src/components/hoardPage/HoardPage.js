// React
import React, {useEffect, useContext} from "react";

// Components
import { HoardFilters } from "./HoardFilters.js";
import { HoardList } from "./HoardList.js";

// Context
import { GameContext } from "../applicationProviders/GameProvider.js";

// Styling
import "./Hoard.css";

// Responsible for displaying the Hoard Filters & Hoard List components
export const HoardPage = () => {
    const { getHoardGames, hoardGames, getUserGames, userGames } = useContext(GameContext);

    // On mount, get the latest userGames
    useEffect(() => {
        getUserGames().then ()
    }, [])

    // If userGames has changed, fetch the hoardGames from BGA API
    useEffect(() => {
        if(hoardGames.map(hg => userGames.some(ug => ug.gameId === hg.id))) {
            const gameIdsToFetch = userGames.map(ug => ug.gameId).join(",");
            getHoardGames(gameIdsToFetch)
        }
    },[userGames])

    return (
        <>
            <HoardFilters />
            <HoardList hoardGames={hoardGames} userGames={userGames}/>
        </>
    );
};