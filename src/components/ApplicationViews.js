import React from "react";
import { Route } from "react-router-dom";

// Hoard Page imports
import { UserGameList } from "./hoardPage/UserGameList.js";

// Search Page imports
import { SearchBar } from "./searchPage/SearchBar.js";
import { SearchList } from "./searchPage/SearchList.js";

export const ApplicationViews = () => {
    return (
        <>
            <Route exact path="/hoardPage">
                <UserGameList />
            </Route>

            <Route exact path="/searchPage">
                <SearchBar />
                <SearchList />
            </Route>
        </>
    );
};