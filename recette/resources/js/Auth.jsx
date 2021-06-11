import { push } from "connected-react-router";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSignedIn } from "./reducks/users/selectors";
import { listenAuthState } from "./reducks/users/operations";

const Auth = ({ children }) => {
    const dispatch = useDispatch();
    const selector = useSelector((state) => state);

    const isSignedIn = getSignedIn(selector);

    useEffect(() => {
        dispatch(listenAuthState());

        // if(isSignedIn) {

        // }

        // const getUserData = () => {
        //     const userDate = axios.get("/api/user");
        //     return userDate;
        // };
        // const userData = getUserData();
        // console.log(userData);
    }, []);
    // console.log(isSignedIn);
    if (isSignedIn) {
        return children;
    } else {
        return <></>;
    }
};

export default Auth;
