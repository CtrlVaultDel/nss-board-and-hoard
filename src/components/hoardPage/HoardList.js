// React
import React, { useEffect, useContext } from "react";

// Components
import { HoardCard } from "./HoardCard.js";

// Context
import { GameContext } from "../applicationProviders/GameProvider.js";

// Styling
import "./Hoard.css";

// Takes the array of hoardGames passed in and sends each individual game to HoardCard
// so each is rendered as its own card on the DOM in the Hoard List below the Hoard Filters
export const HoardList = () => {
    const {getHoardGames, hoardGames, getUserGames, userGames} = useContext(GameContext);
 
    // Allows the HoardList to render the saved games when it is initially mounted
    useEffect(() => {
        getUserGames()
        .then(() => {
            if(userGames.length > 0){
                const newHoardGames = userGames.map(userGame => userGame.gameId);
                getHoardGames(newHoardGames);
            };
        });
    }
    //eslint-disable-next-line
    ,[]);

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