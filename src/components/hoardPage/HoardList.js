// React
import React, { useContext, useEffect } from "react";

// Components
import { HoardCard } from "./HoardCard.js";

// Context
import { GameContext } from "../applicationProviders/GameProvider.js";

// Styling
import "./Hoard.css";

// Takes the array of hoardGames passed in and sends each individual game to HoardCard
// so each is rendered as its own card on the DOM in the Hoard List below the Hoard Filters
export const HoardList = () => {
    const { getHoardGames, hoardGames, getUserGames, userGames } = useContext(GameContext);

    useEffect(() => {
        getUserGames()
    }, [])

    useEffect(() => {
        if(userGames.length > 0) {
            const gameIdsToFetch = userGames.map(ug => ug.gameId).join(",");
            getHoardGames(gameIdsToFetch)
        }
    },[userGames])

    return (
        <div className="hoardList_games">
            {
                hoardGames.map(hoardGame => <HoardCard 
                    key={hoardGame.id} 
                    hoardGame={hoardGame} 
                />)
            }
        </div>
    );
};