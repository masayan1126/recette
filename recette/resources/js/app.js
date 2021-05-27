/**
 * First we will load all of this project's JavaScript dependencies which
 * includes React and other helpers. It's a great starting point while
 * building robust, powerful web applications using React + Laravel.
 */

require("./bootstrap");

import React from "react";
import ReactDOM from "react-dom";
import { Switch, Route, useHistory, BrowserRouter } from "react-router-dom";
import "../css/app.css";

import CalendarFrame from "./components/calendar/CalendarFrame";

const App = () => {
    return (
        <BrowserRouter>
            <Switch>
                {/* <Route
                    path="/calendar/:date_id"
                    component={RecipeScheduleForm}
                /> */}
                <Route path="/calendar(/:date_id)?" component={CalendarFrame} />
            </Switch>
        </BrowserRouter>
    );
};

if (document.getElementById("app")) {
    ReactDOM.render(<App />, document.getElementById("app"));
}
