// React
import React, {useContext} from "react";

// Components
import { HoardCard } from "./HoardCard.js";

// Context
import { GameContext } from "../applicationProviders/GameProvider.js";
import { FilteredGameContext } from "./HoardFilters.js";

// Styling
import "./Hoard.css";

// Takes the array of hoardGames passed in and sends each individual game to HoardCard
// so each is rendered as its own card on the DOM in the Hoard List below the Hoard Filters
export const HoardList = () => {
    const { userGames } = useContext(GameContext)
    const { filteredHoardGames } = useContext(FilteredGameContext)

    // store the current user's ID in a local variable
    const currentUser = parseInt(localStorage.getItem('board_and_hoard_user'));

    return filteredHoardGames.length 
        ? ( <div className="hoardList_games">
                {
                    filteredHoardGames.map(game => <HoardCard 
                        key={game.id} 
                        hoardGame={game} 
                        userGame={userGames.find(ug => ug.gameId === game.id && ug.userId === currentUser)}
                    />)
                }
            </div>)
        : (<h1 className="hoardList_games">No Games Yet</h1>)
}