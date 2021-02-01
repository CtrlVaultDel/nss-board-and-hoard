import React, {useContext} from "react";
import { HoardFilters } from "./HoardFilters.js";
import { HoardList } from "./HoardList.js";
import { GameContext } from "../boardGameAtlas/GameProvider.js";
import "./Hoard.css";

// Responsible for displaying the Search Filters & Search List components
export const HoardPage = () => {
    const {games, getGamesByIds} = useContext(GameContext);

    return (
        <>
            <HoardFilters />
            <HoardList />
        </>
    );
};