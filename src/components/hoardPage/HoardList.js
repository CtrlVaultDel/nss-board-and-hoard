import React, {useEffect} from "react";
import { HoardCard } from "./HoardCard.js";
import "./Hoard.css";

// Takes the array of 
export const HoardList = ({getUserGames, getGamesById, hoardGames, deleteUserGame, userGames}) => {

    useEffect(() => {
        getUserGames()
        .then(() => {
            getGamesById(userGames.map(userGame => userGame.gameId))
        })
    }
    ,[])

    return (
        <>
            <h1>Hoard List goes here</h1>
            <div className="hoardList_games">
                {
                    hoardGames.map(hoardGame => <HoardCard key={hoardGame.id} hoardGame={hoardGame} deleteUserGame={deleteUserGame} userGames={userGames} />)
                }
            </div>
        </>
    );
};