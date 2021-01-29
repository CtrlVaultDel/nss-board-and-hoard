import React from "react";
import "./SearchFilters.css";

export const SearchFilters = () => {
    return (
        <form className="SearchFilters">
            <h2 className="employeeForm__title">Search Filters</h2>
            <fieldset >
                <div className="nameContainer">
                    <label htmlFor="boardgameName">Boardgame Name: </label>
                    <input type="text" id="boardgameName" className="boardgameName" name="name" autoFocus defaultValue=""></input>
                </div>
            </fieldset>
            <fieldset>
                <div className="sliderContainer">
                    <label htmlFor="minPlayers">Min Players</label>
                    <input type="range" id="minPlayerSlider" className="minPlayerSlider" min="1" max="8"></input>
                </div>
            </fieldset>
            <fieldset>
                <div className="categoryOne">
                    <label htmlFor="categoryOne">Category 1: </label>
                    <select>
                        <option value="0">Select a category</option>
                    </select>
                </div>
                <div className="categoryTwo">
                    <label htmlFor="categoryTwo">Category 2: </label>
                    <select>
                        <option value="0">Select a category</option>
                    </select>
                </div>
                <div className="categoryThree">
                    <label htmlFor="categoryThree">Category 3: </label>
                    <select>
                        <option value="0">Select a category</option>
                    </select>
                </div>
            </fieldset>
            <fieldset>
                <div className="mechanicOne">
                    <label htmlFor="mechanicOne">Mechanic 1: </label>
                    <select>
                        <option value="0">Select a mechanic</option>
                    </select>
                </div>
                <div className="mechanicTwo">
                    <label htmlFor="mechanicTwo">Mechanic 2: </label>
                    <select>
                        <option value="0">Select a mechanic</option>
                    </select>
                </div>
                <div className="mechanicThree">
                    <label htmlFor="mechanicThree">Mechanic 3: </label>
                    <select>
                        <option value="0">Select a mechanic</option>
                    </select>
                </div>
            </fieldset>
        </form>
    );
}