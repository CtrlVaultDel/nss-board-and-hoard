import React, {useContext, useEffect} from "react";
import { HoardFilters } from "./HoardFilters.js";
import { HoardList } from "./HoardList.js";
import { GameContext } from "../GameProvider.js";
import "./Hoard.css";

// Responsible for displaying the Search Filters & Search List components
export const HoardPage = () => {
    const {hoardGames, getHoardGames, userGames, getUserGames, deleteUserGame} = useContext(GameContext);
    // Allows the Hoard Page to render the saved games when it is initially mounted

    // *** Create an initializeHoardPage function here that lives in the GameProvider.js
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
        <>
            <HoardFilters />
            <HoardList 
                hoardGames={hoardGames} 
                deleteUserGame={deleteUserGame} 
                userGames={userGames} 
            />
        </>
    );
};