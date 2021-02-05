// React
import React from "react";

// Components
import { HoardCard } from "./HoardCard.js";

// Styling
import "./Hoard.css";

// Takes the array of hoardGames passed in and sends each individual game to HoardCard
// so each is rendered as its own card on the DOM in the Hoard List below the Hoard Filters
export const HoardList = ({hoardGames, userGames}) => {
    if(hoardGames.length === userGames.length){
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
    } else {
        return <h3 className="hoardList_games">No Games!</h3>
    }
};