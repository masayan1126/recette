import React, { useCallback, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signInAction } from "../../reducks/users/actions";

const Register = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const dispatch = useDispatch();
    const selector = useSelector((state) => state);

    const register = async (e) => {
        e.preventDefault();

        axios
            .post("/api/register", {
                email,
                password,
                username,
                confirmPassword,
            })
            .then((res) => {
                console.log(res.data);
                // if (res.data.result) {
                //     console.log("[login]ログイン成功");
                //     setUser(res.data.user);
                //     dispatch(
                //         signInAction({
                //             uid: "0001",
                //             username: "テストマン",
                //             isSignedIn: true,
                //         })
                //     );
                // } else {
                //     console.log(res.data.message);
                //     console.log("[login]ログイン失敗");
                // }
            })
            .catch((err) => {
                console.log(err.response);
                console.log("[login]ログイン失敗");
            });
    };

    return (
        <div>
            <h1>ログイン</h1>
            <label>
                ユーザーネーム
                <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
            </label>
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
            <label>
                確認用パスワード：
                <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                />
            </label>

            <button className="border" onClick={(e) => register(e)}>
                登録
            </button>
        </div>
    );
};
export default Register;
