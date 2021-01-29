import React from "react";
import { Route } from "react-router-dom";

// Hoard Page imports
import { HoardGameFilters } from "./hoardPage/HoardGameFilters";
import { HoardGameList } from "./hoardPage/HoardGameList.js";

// Search Page imports
import { SearchFilters } from "./searchPage/SearchFilters.js";
import { SearchList } from "./searchPage/SearchList.js";

export const ApplicationViews = () => {
    return (
        <>
            <Route exact path="/hoardPage">
                <HoardGameFilters />
                <HoardGameList />
            </Route>

            <Route exact path="/searchPage">
                <SearchFilters />
                <SearchList />
            </Route>
        </>
    );
};