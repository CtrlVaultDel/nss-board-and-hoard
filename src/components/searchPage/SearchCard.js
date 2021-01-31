import React from "react";
import "./Search.css";

export const SearchCard = ({ gameObject }) => {
    return (
        <section className="game">
            <h3 className="game__name">{gameObject.name}</h3>
            <img src={gameObject.images.original} alt={`Cover for ${gameObject.name}`} />
        </section>
)};