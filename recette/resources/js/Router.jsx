import React from "react";
import { Route, Switch } from "react-router";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Auth from "./Auth";
import CalendarFrame from "./components/calendar/CalendarFrame";

const Router = () => {
    return (
        <Switch>
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />

            <Auth>
                <Route path="/calendar(/:date_id)?" component={CalendarFrame} />
                {/* <Route exact path="(/)?" component={ProductList} />
                <Route exact path="/product/:id" component={ProductDetail} />
                <Route path="/product/edit(/:id)?" component={ProductEdit} />

                <Route exact path="/cart" component={CartList} />
                <Route exact path="/order/confirm" component={OrderConfirm} />
                <Route exact path="/order/complete" component={OrderComplete} />
                <Route exact path="/order/history" component={OrderHistory} />

                <Route exact path="/user/mypage" component={UserMyPage} />
                <Route
                    exact
                    path="/user/payment/edit"
                    component={CheckoutWrapper}
                /> */}
            </Auth>
        </Switch>
    );
};

export default Router;
