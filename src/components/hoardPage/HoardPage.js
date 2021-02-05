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
    useEffect(() => getUserGames
    //eslint-disable-next-line
    , [])

    // If userGames has changed, fetch the hoardGames from BGA API
    useEffect(() => {
        getHoardGames()
    }
    //eslint-disable-next-line
    ,[userGames])

    return (
        <>
            <HoardFilters hoardGames={hoardGames} />
            <HoardList hoardGames={hoardGames} userGames={userGames}/>
        </>
    );
};