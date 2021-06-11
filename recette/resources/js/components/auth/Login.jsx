import React, { useCallback, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Switch, Route, useHistory, BrowserRouter } from "react-router-dom";
import { signInAction } from "../../reducks/users/actions";
import { Link } from "react-router-dom";
import { push } from "connected-react-router";
import { listenAuthState, signIn } from "../../reducks/users/operations";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const dispatch = useDispatch();
    const selector = useSelector((state) => state);
    const history = useHistory();

    const getUserData = () => {
        axios
            .get("/api/user")
            .then((res) => {
                console.log(res.data);
            })
            .catch((err) => {
                console.log(err.response);
            });
    };

    useEffect(() => {
        dispatch(listenAuthState());
    }, []);

    return (
        <div>
            <Link to="/register">register</Link>
            <h1>ログイン</h1>
            <label>
                メールアドレス：
                <input
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </label>
            <label>
                パスワード：
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </label>

            <button
                className="border"
                onClick={() => dispatch(signIn(email, password))}
            >
                サインイン
            </button>

            <button className="border" onClick={() => getUserData()}>
                ユーザー情報の取得
            </button>
        </div>
    );
};
export default Login;
