import { push } from "connected-react-router";
import { signOutAction, signInAction } from "./actions";

// フェッチしたユーザー情報を元にstoreのstateに渡す情報を生成(signInとlistenAuthStateで使用)
const createAuthenticationInfo = (fethedAuthenticationResponse) => {
    const info = {
        email: fethedAuthenticationResponse.email,
        isSignedIn: true,
        uid: fethedAuthenticationResponse.id,
        username: fethedAuthenticationResponse.name,
    };
    return info;
};

export const signIn = (email, password) => {
    return async (dispatch, getState) => {
        // getStateで簡単に現在のstoreのstateの値が取得できる -> const isSignedIn = getState().users.isSignedIn;
        // ログイン時にCSRFトークンを初期化
        axios.get("/sanctum/csrf-cookie").then((response) => {
            axios
                // ログインフォームで入力されたemailとパスワードを元に認証チェック
                .post("/api/login", {
                    email,
                    password,
                })
                .then((res) => {
                    console.log(res);
                    dispatch(signInAction(createAuthenticationInfo(res.data)));
                    dispatch(push("/calendar"));
                    console.log(getState().users);
                })

                .catch((err) => {
                    console.log(err.response);
                });
        });
    };
};

export const signOut = () => {
    return async (dispatch, getState) => {
        axios
            .post("api/logout")
            .then((res) => {
                console.log("signout関数が実行されまいた");
                console.log(res.data);
                dispatch(push("/login"));
                dispatch(signOutAction());
                console.log(getState().users);
            })
            .catch((err) => {
                console.log(err.response);
            });
    };
};

// リロード時に認証のセッションがcookieにあるか確認して、なければログインページにリダイレクトする
export const listenAuthState = () => {
    return async (dispatch, getState) => {
        axios
            .get("/api/user")
            .then((res) => {
                // リロードするとstoreのstateが初期化されるので、再度サインイン処理でstateを更新する
                dispatch(signInAction(createAuthenticationInfo(res.data)));
            })
            .catch((err) => {
                dispatch(signOutAction());
                dispatch(push("/login"));
            });
    };
};
