// React
import React from "react";

// Components
import { SearchFilters } from "./SearchFilters.js";
import { SearchList } from "./SearchList.js";

// Styles
import "./Search.css";

/* ===================================================== */

// Responsible for displaying the Search Filters & Search List components
export const SearchPage = () => {
    return (
        <>
            <SearchFilters />
            <SearchList  />
        </>
    );
};