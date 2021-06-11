import React from "react";
import ReactLoading from "react-loading";
import { useSelector } from "react-redux";
import { getIsLoading, getLoadingText } from "../../reducks/loading/selectors";

const Loading = ({ children }) => {
    const selector = useSelector((state) => state);
    const isLoding = getIsLoading(selector);
    const loadingText = getLoadingText(selector);

    if (isLoding) {
        return (
            <section className="flex justify-center items-center h-screen">
                <div>
                    <ReactLoading
                        type="spin"
                        color="#ebc634"
                        height="100px"
                        width="100px"
                        className="mx-auto"
                    />
                    <p className="text-center mt-3">{loadingText}</p>
                </div>
            </section>
        );
    } else {
        return <>{children}</>;
    }
};

export default Loading;
