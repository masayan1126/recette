import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { signInAction } from "./reducks/users/actions";

const App = () => {
    const dispatch = useDispatch();
    const selector = useSelector((state) => state);
    console.log(selector.users);
    return (
        <>
            <button
                className="border"
                onClick={() =>
                    dispatch(
                        signInAction({
                            uid: "0001",
                            username: "テストマン",
                            isSignedIn: true,
                        })
                    )
                }
            >
                サインイン
            </button>
            <p>App</p>
        </>
    );
};

export default App;
