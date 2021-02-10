import React from "react";
import { Link, useHistory } from "react-router-dom";

// Styles
import "./NavBar.css";

export const NavBar = (props) => {
    const history = useHistory();
    return (
        <ul className="navbar">
            <li className="navbar__item">
                <Link className="navbar__link" to="/hoardPage">Hoard Page</Link>
            </li>
            <li className="navbar__item">
                <Link className="navbar__link" to="/searchPage">Search Page</Link>
            </li>
            <button id="logout_button" onClick={(e) => {
                    if(e.target.id === "logout_button"){
                        localStorage.removeItem("board_and_hoard_user");
                        return history.push("/login")
                    } else {
                        return false;
                    }
                }
            }>Logout</button>
        </ul>
    )
};