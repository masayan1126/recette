/**
 * First we will load all of this project's JavaScript dependencies which
 * includes React and other helpers. It's a great starting point while
 * building robust, powerful web applications using React + Laravel.
 */

require("./bootstrap");

import React from "react";
import ReactDOM from "react-dom";
import createStore from "./reducks/store/store";
import { Provider } from "react-redux";
import { Switch, Route, useHistory, BrowserRouter } from "react-router-dom";
import "../css/app.css";
import App from "./App";

import CalendarFrame from "./components/calendar/CalendarFrame";

export const store = createStore();

if (document.getElementById("root")) {
    ReactDOM.render(
        <Provider store={store}>
            <BrowserRouter>
                <App />
                <Switch>
                    <Route
                        path="/calendar(/:date_id)?"
                        component={CalendarFrame}
                    />
                </Switch>
            </BrowserRouter>
        </Provider>,
        document.getElementById("root")
    );
}
