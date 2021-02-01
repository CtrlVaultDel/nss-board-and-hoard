import React from "react";
import "./Search.css";

export const SearchCard = ({game}) => {
    return (
        <section className="game">
            <h3 className="game__name">{game.name}</h3>
            <img src={game.images.original} alt={`Cover for ${game.name}`} />
        </section>
)};