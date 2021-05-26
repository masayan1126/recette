/**
 * First we will load all of this project's JavaScript dependencies which
 * includes React and other helpers. It's a great starting point while
 * building robust, powerful web applications using React + Laravel.
 */

require("./bootstrap");

import React from "react";
import ReactDOM from "react-dom";
import { Switch, Route, useHistory, BrowserRouter } from "react-router-dom";

import Calendar from "./components/calendar/Calendar";
import Modal from "./components/common/Modal";

const App = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/calendar/:date_id/edit" component={Modal} />
                <Route exact path="/calendar" component={Calendar} />
            </Switch>
        </BrowserRouter>
    );
};

if (document.getElementById("app")) {
    ReactDOM.render(<App />, document.getElementById("app"));
}
