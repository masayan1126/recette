require("./bootstrap");

import React from "react";
import ReactDOM from "react-dom";
import createStore from "./reducks/store/store";
import { Provider } from "react-redux";
import { ConnectedRouter } from "connected-react-router";
import { Switch, Route, useHistory, BrowserRouter } from "react-router-dom";
import * as History from "history";
import "../css/app.css";
import App from "./App";
import Loading from "./components/common/Loading";

import CalendarFrame from "./components/calendar/CalendarFrame";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";

const history = History.createBrowserHistory();
export const store = createStore(history);

if (document.getElementById("root")) {
    ReactDOM.render(
        <Provider store={store}>
            <ConnectedRouter history={history}>
                <Loading>
                    <App />
                </Loading>
            </ConnectedRouter>
        </Provider>,
        document.getElementById("root")
    );
}
