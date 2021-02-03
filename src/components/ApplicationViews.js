import React from "react";
import { Route } from "react-router-dom";

// Games, Mechanics & Categories imports
import { GameProvider } from "./GameProvider.js";
import { MechanicProvider } from "./mechanics/MechanicProvider.js";
import { CategoryProvider } from "./categories/CategoryProvider.js";

// Hoard Page imports
import { HoardPage } from "./hoardPage/HoardPage.js";

// Search Page imports
import { SearchPage } from "./searchPage/SearchPage.js";

export const ApplicationViews = () => {
    return (
        <>
            <GameProvider>
                <MechanicProvider>
                    <CategoryProvider>
                        {/* Display the Hoard Page filters and user-saved games when on /hoardPage */}
                        <Route exact path="/hoardPage">
                            <HoardPage />
                        </Route>
                        {/* Display the Search Page filters and fetch call response when on /searchPage */}
                        <Route exact path="/searchPage">
                            <SearchPage />
                        </Route>
                    </CategoryProvider>
                </MechanicProvider>
            </GameProvider>
        </>
    );
};