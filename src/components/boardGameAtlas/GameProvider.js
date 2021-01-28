import React, { useState, createContext } from "react";
import { BGA_client_id } from "../key.js"

export const GameContext = createContext();

export const GameProvider = (props) => {
    const [games, setGames] = useState([]);

    const getGamesByFilters = (name,min_players,max_players,categories,mechanics) => {
        return fetch(`https://api.boardgameatlas.com/api/search?fuzzy_match=${name}&min_players=${min_players}&max_players=${max_players}&categories=${categories.map(category).join("")}&mechanics=${mechanics.map(mechanic).join("")}&client_id=${BGA_client_id}`)
        .then(response => response.json())
        .then(setGames);
    };

    const getGamesById = (ids) => {
        return fetch (`https://api.boardgameatlas.com/api/search?ids=${ids.map(id).join("")}&client_id=${BGA_client_id}`)
        .then(response => response.json())
        .then(setGames);
    };

    return (
        <GameContext.Provider value={{games, getGamesByFilters, getGamesById}}>
            {props.children}
        </GameContext.Provider>
    );
};