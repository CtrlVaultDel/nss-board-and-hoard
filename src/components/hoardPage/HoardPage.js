// React
import React from "react";

// Components
import { HoardFilters } from "./HoardFilters.js";
import { HoardList } from "./HoardList.js";

// Styling
import "./Hoard.css";

// Responsible for displaying the Hoard Filters & Hoard List components
export const HoardPage = () => {
    return (
        <>
            <HoardFilters />
            <HoardList />
        </>
    );
};