import React from "react";
import { Route, Redirect } from "react-router-dom";
import { ApplicationViews } from "./ApplicationViews.js";
import { NavBar } from "./nav/NavBar.js";
import { Login } from "./auth/Login.js";
import { Register } from "./auth/Register.js";

export const BoardAndHoard = () => (
  <>
    <Route
      render={() => {
        if (localStorage.getItem("board_and_hoard_user")) {
          return (
            <>
              <NavBar />
              <ApplicationViews />
            </>
          );
        } else {
          return <Redirect to="/login" />;
        }
      }}
    />

    <Route path="/login">
      <Login />
    </Route>
    
    <Route path="/register">
      <Register />
    </Route>
  </>
);