export const HIDE_LOADING = "HIDE_LOADING";
export const hideLoadingAction = () => {
    return {
        type: "HIDE_LOADING",
        payload: {
            isLoading: false,
            text: "",
        },
    };
};

export const SHOW_LOADING = "SHOW_LOADING";
export const showLoadingAction = (
    text = "処理中です。しばらくお待ちください"
) => {
    return {
        type: "SHOW_LOADING",
        payload: {
            isLoading: true,
            text: text,
        },
    };
};
